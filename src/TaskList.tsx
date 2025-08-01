import type Task from "./Task.ts";
import TaskRow from "./TaskRow.tsx";
import TaskAdditionSection from "./TaskAdditionSection.tsx";
import { useQuery } from "@tanstack/react-query";
import { tasksListOptions } from "./queries.ts";

export default function TaskList() {
  const taskGetQuery = useQuery(tasksListOptions);

  let body;
  if (taskGetQuery.isPending) {
    body = <div>Loading</div>;
  } else {
    if (taskGetQuery.isError) {
      body = <div>Error loading the tasks: {taskGetQuery.error.message}</div>;
    } else {
      body = (
        <>
          {taskGetQuery.data.map((task: Task) => {
            if (!task.done) {
              return <TaskRow key={task.id} task={task} done={task.done} />;
            }
          })}
          {taskGetQuery.data.map((task: Task) => {
            if (task.done) {
              return <TaskRow key={task.id} task={task} done={task.done} />;
            }
          })}
        </>
      );
    }
  }

  return (
    <div>
      <div className="text-2xl text-gray-950">Tasks</div>
      <TaskAdditionSection />
      {body}
    </div>
  );
}
