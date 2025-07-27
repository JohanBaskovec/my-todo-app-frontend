import type Task from "./Task.ts";

interface TaskRowProps {
    task: Task,
    onCheckboxChange: (taskId: number, completed: boolean) => void,
    completed: boolean
}

export default function TaskRow(props: TaskRowProps) {
    return <div className="py-1 grid grid-cols-[1em_auto] gap-1">
        <div className="px-1">

            <input type="checkbox"
                   className="cursor-pointer
                   accent-blue-600 hover:accent-blue-500
                   transition-colors
                   "
                   checked={props.completed}
                   onChange={() => props.onCheckboxChange(props.task.id!!, !props.completed)}
            />
        </div>
        <div className={`px-1 ${props.task.completed && "line-through"}`}>
            {props.task.name}
        </div>
    </div>;
}

