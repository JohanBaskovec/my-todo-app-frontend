import { useState } from "react";
import TaskForm from "./TaskForm.tsx";
import Button from "./Button.tsx";

export default function TaskAdditionSection() {
  const [showForm, setShowForm] = useState(false);

  function handleClick() {
    setShowForm(true);
  }

  function handleCancel() {
    setShowForm(false);
  }

  return (
    <div>
      {!showForm && (
        <div className="">
          <Button onClick={handleClick}>Add task</Button>
        </div>
      )}
      {showForm && <TaskForm task={null} onCancel={handleCancel} />}
    </div>
  );
}
