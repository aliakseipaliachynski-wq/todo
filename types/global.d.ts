/**
 * Minimal Node.js process type for config files (playwright, next.config, etc.)
 * when @types/node is not yet installed.
 */
declare namespace NodeJS {
  interface ProcessEnv {
    CI?: string;
    NODE_ENV?: string;
  }
}

declare const process: {
  env: NodeJS.ProcessEnv;
};
