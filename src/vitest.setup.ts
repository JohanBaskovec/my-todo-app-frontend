import { afterAll, afterEach, beforeAll } from "vitest";
import { server } from "./mocks/server.ts";

// Establish API mocking before all tests.
beforeAll(() => {
  server.listen();
});

// Reset any request handlers after each test.
afterEach(() => {
  server.resetHandlers();
});

// Clean up after all tests.
afterAll(() => {
  server.close();
});
