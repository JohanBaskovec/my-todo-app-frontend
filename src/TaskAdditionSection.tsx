import type Task from "./Task.ts";
import {useState} from "react";
import TaskForm from "./TaskForm.tsx";
import Button from "./Button.tsx";

interface TaskAdditionSectionProps {
    onAddTask: (task: Task) => void
}

export default function TaskAdditionSection(props: TaskAdditionSectionProps) {
    const [showForm, setShowForm] = useState(false);

    function handleClick() {
        setShowForm(true);
    }

    function handleAddTask(task: Task) {
        props.onAddTask(task);
        setShowForm(false);
    }

    function handleCancel() {
        setShowForm(false);
    }

    return <div>
        {!showForm && <Button onClick={handleClick}>Add task</Button>}
        {showForm && <TaskForm task={null}
                               onAddTask={handleAddTask}
                               onCancel={handleCancel}
        />}
    </div>;
}
