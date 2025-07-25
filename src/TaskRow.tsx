import type Task from "./Task.ts";

export default function TaskRow(props: { task: Task }) {
    return <div className="TaskRow">
        <div className="TaskRow__title">{props.task.name}</div>
    </div>;
}

