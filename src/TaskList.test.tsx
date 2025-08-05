import { render, screen } from "@testing-library/react";
import { test } from "vitest";
import App from "./App.tsx";
import "@testing-library/jest-dom";

test("loads and displays greeting", async () => {
  render(<App />);

  screen.getByText("Loading");

  const task1 = await screen.findByText("Task 1");
  expect(task1).not.toHaveStyle("text-decoration-line: line-through;");
  screen.getByText("Task 2");
});
