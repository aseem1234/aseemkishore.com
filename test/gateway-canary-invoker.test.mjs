import assert from "node:assert/strict";
import { test } from "node:test";

import {
  invokeGatewayCanary,
  operatorEnvironment,
} from "../scripts/invoke-gateway-canary.mjs";

test("canary invoker forwards operator metadata but no application secret", () => {
  const env = {
    PATH: "/safe/bin",
    HOME: "/safe/home",
    TOGETHER_API_KEY: "direct-secret",
    VERCEL_OIDC_TOKEN: "oidc-secret",
    CRON_SECRET: "cron-secret",
    TWEET_SCORE_GATEWAY_CANARY_ARMED: "true",
  };
  assert.deepEqual(operatorEnvironment(env), {
    PATH: "/safe/bin",
    HOME: "/safe/home",
  });

  let observed;
  invokeGatewayCanary({
    env,
    cwd: "/safe/repo",
    runCommand: (...args) => {
      observed = args;
    },
  });
  assert.deepEqual(observed, [
    "vercel",
    ["crons", "run", "/api/gateway-canary"],
    {
      cwd: "/safe/repo",
      env: { PATH: "/safe/bin", HOME: "/safe/home" },
      stdio: "inherit",
    },
  ]);
});
