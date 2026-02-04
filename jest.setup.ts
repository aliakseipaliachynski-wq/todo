import "@testing-library/jest-dom";
import { randomUUID } from "node:crypto";

const cryptoShim = { randomUUID } as Crypto;
if (typeof globalThis.crypto?.randomUUID !== "function") {
  globalThis.crypto = cryptoShim;
}
if (typeof global !== "undefined" && typeof (global as NodeJS.Global & { crypto?: Crypto }).crypto?.randomUUID !== "function") {
  (global as NodeJS.Global & { crypto: Crypto }).crypto = cryptoShim;
}

