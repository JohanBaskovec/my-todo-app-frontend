import { http, HttpResponse } from "msw";
import type Task from "../Task.ts";

export const handlers = [
  http.get("http://localhost:8081/task", () => {
    const tasks: Task[] = [
      {
        id: 1,
        name: "Task 1",
        done: false,
      },
      {
        id: 2,
        name: "Task 2",
        done: false,
      },
    ];
    return HttpResponse.json(tasks);
  }),
];
