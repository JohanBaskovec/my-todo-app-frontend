import type Task from "./Task.ts";
import TaskRow from "./TaskRow.tsx";

interface TaskProps {
    tasks: Task[];
}

export default function TaskList(props: TaskProps) {
    return <div className="TaskList">
        <div className='TaskList__title'>TODOs</div>
        {props.tasks.map((task: Task) => (<TaskRow key={task.id} task={task} />))}

    </div>
}