import { execFileSync } from "node:child_process";

const CANARY_PATH = "/api/gateway-canary";
const ALLOWED_ENV = [
  "PATH",
  "HOME",
  "XDG_CONFIG_HOME",
  "VERCEL_TOKEN",
  "CI",
  "TERM",
  "NO_COLOR",
  "LANG",
  "LC_ALL",
  "TMPDIR",
];

export function operatorEnvironment(env) {
  return Object.fromEntries(
    ALLOWED_ENV.flatMap((name) =>
      typeof env[name] === "string" && env[name] ? [[name, env[name]]] : [],
    ),
  );
}
export function invokeGatewayCanary({
  env = process.env,
  cwd = process.cwd(),
  runCommand = execFileSync,
} = {}) {
  runCommand("vercel", ["crons", "run", CANARY_PATH], {
    cwd,
    env: operatorEnvironment(env),
    stdio: "inherit",
  });
}

if (import.meta.url === `file://${process.argv[1]}`) {
  try {
    invokeGatewayCanary();
  } catch {
    console.error("Gateway canary trigger failed");
    process.exitCode = 1;
  }
}
