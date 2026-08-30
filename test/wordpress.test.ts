import assert from "node:assert/strict";
import { test } from "node:test";

import { getPosts } from "../src/lib/wordpress";

test("WordPress requests use a bounded deadline without changing cache behavior", async () => {
  const originalFetch = globalThis.fetch;
  const originalTimeout = AbortSignal.timeout;
  const deadlineSignal = new AbortController().signal;
  const requestedTimeouts: number[] = [];
  let receivedInit: RequestInit | undefined;

  Object.defineProperty(AbortSignal, "timeout", {
    configurable: true,
    value: (milliseconds: number) => {
      requestedTimeouts.push(milliseconds);
      return deadlineSignal;
    },
  });
  globalThis.fetch = async (_input, init) => {
    receivedInit = init;
    return Response.json([]);
  };

  try {
    assert.deepEqual(await getPosts(), []);
    assert.deepEqual(requestedTimeouts, [10_000]);
    assert.equal(receivedInit?.signal, deadlineSignal);
    assert.deepEqual(
      (receivedInit as RequestInit & { next?: { revalidate: number } })?.next,
      { revalidate: 60 },
    );
  } finally {
    globalThis.fetch = originalFetch;
    Object.defineProperty(AbortSignal, "timeout", {
      configurable: true,
      value: originalTimeout,
    });
  }
});

test("WordPress transport failures retain the existing fallback", async () => {
  const originalFetch = globalThis.fetch;
  const originalConsoleError = console.error;
  const errors: unknown[][] = [];
  globalThis.fetch = async () => {
    throw new DOMException("request timed out", "TimeoutError");
  };
  console.error = (...args: unknown[]) => {
    errors.push(args);
  };

  try {
    assert.deepEqual(await getPosts(), []);
    assert.equal(errors.length, 1);
  } finally {
    globalThis.fetch = originalFetch;
    console.error = originalConsoleError;
  }
});
