import assert from "node:assert/strict";
import { test } from "node:test";

import { getPost, getPosts, type WPPost } from "../src/lib/wordpress";

type NextFetchInit = RequestInit & {
  next?: { revalidate?: number };
};

const originalTimeout = process.env.WORDPRESS_FETCH_TIMEOUT_MS;

test.afterEach(() => {
  if (originalTimeout === undefined) {
    delete process.env.WORDPRESS_FETCH_TIMEOUT_MS;
  } else {
    process.env.WORDPRESS_FETCH_TIMEOUT_MS = originalTimeout;
  }
});

test("WordPress success preserves URL, query, cache, and deadline cleanup", async (t) => {
  delete process.env.WORDPRESS_FETCH_TIMEOUT_MS;

  const timerHandle = { type: "wordpress-timeout" } as unknown as ReturnType<typeof setTimeout>;
  let scheduledDelay: number | undefined;
  let requestUrl: string | undefined;
  let requestInit: NextFetchInit | undefined;

  t.mock.method(globalThis, "setTimeout", ((callback: () => void, delay?: number) => {
    assert.equal(typeof callback, "function");
    scheduledDelay = delay;
    return timerHandle;
  }) as typeof setTimeout);
  const clearTimeoutMock = t.mock.method(
    globalThis,
    "clearTimeout",
    (() => undefined) as typeof clearTimeout,
  );

  const posts = [{ id: 42, slug: "bounded-fetch" }] as WPPost[];
  t.mock.method(globalThis, "fetch", async (input, init) => {
    requestUrl = String(input);
    requestInit = init as NextFetchInit;
    return Response.json(posts);
  });

  assert.deepEqual(await getPosts(7, 3), posts);

  assert.ok(requestUrl);
  const url = new URL(requestUrl);
  assert.equal(url.pathname.endsWith("/posts"), true);
  assert.deepEqual([...url.searchParams.entries()], [
    ["per_page", "7"],
    ["page", "3"],
    ["_embed", "true"],
  ]);
  assert.deepEqual(requestInit?.next, { revalidate: 60 });
  assert.ok(requestInit?.signal instanceof AbortSignal);
  assert.equal(requestInit.signal.aborted, false);
  assert.equal(scheduledDelay, 10_000);
  assert.equal(clearTimeoutMock.mock.callCount(), 1);
  assert.equal(clearTimeoutMock.mock.calls[0].arguments[0], timerHandle);
});

test("WordPress timeout covers response parsing and preserves the list fallback", async (t) => {
  process.env.WORDPRESS_FETCH_TIMEOUT_MS = "2500";

  const timerHandle = { type: "wordpress-timeout" } as unknown as ReturnType<typeof setTimeout>;
  let deadline: (() => void) | undefined;
  let requestSignal: AbortSignal | undefined;
  let parsingStartedResolve: (() => void) | undefined;
  const parsingStarted = new Promise<void>((resolve) => {
    parsingStartedResolve = resolve;
  });

  const setTimeoutMock = t.mock.method(globalThis, "setTimeout", ((callback: () => void) => {
    deadline = callback;
    return timerHandle;
  }) as typeof setTimeout);
  const clearTimeoutMock = t.mock.method(
    globalThis,
    "clearTimeout",
    (() => undefined) as typeof clearTimeout,
  );
  const consoleErrorMock = t.mock.method(console, "error", () => undefined);

  t.mock.method(globalThis, "fetch", async (_input, init) => {
    requestSignal = init?.signal ?? undefined;
    return {
      ok: true,
      json: async () => {
        parsingStartedResolve?.();
        return new Promise<never>((_resolve, reject) => {
          requestSignal?.addEventListener("abort", () => reject(requestSignal?.reason), {
            once: true,
          });
        });
      },
    } as Response;
  });

  const postsPromise = getPosts();
  await parsingStarted;

  assert.equal(setTimeoutMock.mock.calls[0].arguments[1], 2500);
  assert.equal(clearTimeoutMock.mock.callCount(), 0);
  assert.ok(deadline);
  deadline();

  assert.deepEqual(await postsPromise, []);
  assert.equal(requestSignal?.aborted, true);
  assert.equal(requestSignal?.reason?.name, "TimeoutError");
  assert.equal(consoleErrorMock.mock.callCount(), 1);
  assert.equal(
    consoleErrorMock.mock.calls[0].arguments[0],
    "WordPress API fetch failed for /posts:",
  );
  assert.equal(clearTimeoutMock.mock.callCount(), 1);
  assert.equal(clearTimeoutMock.mock.calls[0].arguments[0], timerHandle);
});

test("WordPress timeout configuration is validated and capped per request", async (t) => {
  const scheduledDelays: Array<number | undefined> = [];
  const requestSignals: AbortSignal[] = [];

  t.mock.method(globalThis, "setTimeout", ((callback: () => void, delay?: number) => {
    assert.equal(typeof callback, "function");
    scheduledDelays.push(delay);
    return scheduledDelays.length as unknown as ReturnType<typeof setTimeout>;
  }) as typeof setTimeout);
  t.mock.method(globalThis, "clearTimeout", (() => undefined) as typeof clearTimeout);
  t.mock.method(globalThis, "fetch", async (_input, init) => {
    assert.ok(init?.signal);
    requestSignals.push(init.signal);
    return Response.json([]);
  });

  const cases: Array<[string | undefined, number]> = [
    [undefined, 10_000],
    ["", 10_000],
    ["garbage", 10_000],
    ["0", 10_000],
    ["-1", 10_000],
    ["1.5", 10_000],
    ["Infinity", 10_000],
    ["1", 1],
    ["2500", 2_500],
    ["30000", 30_000],
    ["30001", 30_000],
  ];

  for (const [configured, expected] of cases) {
    if (configured === undefined) {
      delete process.env.WORDPRESS_FETCH_TIMEOUT_MS;
    } else {
      process.env.WORDPRESS_FETCH_TIMEOUT_MS = configured;
    }
    await getPosts();
    assert.equal(scheduledDelays.at(-1), expected);
  }

  assert.equal(new Set(requestSignals).size, cases.length);
});

test("WordPress failures preserve the single-post null fallback", async (t) => {
  const error = new Error("WordPress unavailable");
  t.mock.method(globalThis, "fetch", async () => {
    throw error;
  });
  const consoleErrorMock = t.mock.method(console, "error", () => undefined);

  assert.equal(await getPost("missing-post"), null);
  assert.equal(consoleErrorMock.mock.callCount(), 1);
  assert.equal(
    consoleErrorMock.mock.calls[0].arguments[0],
    "WordPress API fetch failed for /posts:",
  );
  assert.equal(consoleErrorMock.mock.calls[0].arguments[1], error);
});

test("WordPress HTTP errors preserve the list fallback and existing log", async (t) => {
  t.mock.method(globalThis, "fetch", async () => (
    new Response(null, { status: 503, statusText: "Service Unavailable" })
  ));
  const consoleErrorMock = t.mock.method(console, "error", () => undefined);

  assert.deepEqual(await getPosts(), []);
  assert.equal(consoleErrorMock.mock.callCount(), 1);
  assert.equal(
    consoleErrorMock.mock.calls[0].arguments[0],
    "WordPress API error: 503 Service Unavailable for /posts",
  );
});
