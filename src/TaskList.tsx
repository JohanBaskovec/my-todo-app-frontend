import type Task from "./Task.ts";
import TaskRow from "./TaskRow.tsx";
import {useState} from "react";
import TaskAdditionSection from "./TaskAdditionSection.tsx";


const defaultTasks: Task[] = [{id: 1, name: 'Complete my portfolio',},
    {id: 2, name: 'Apply for jobs',}
];
let nextId = 3;

export default function TaskList() {
    const [tasks, setTasks] = useState<Task[]>(defaultTasks);

    function handleAddTask(task: Task) {
        setTasks([{
           id: nextId++,
            name: task.name,
        }, ...tasks]);
    }

    return <div>
        <div className="text-2xl text-gray-950">TODOs</div>
        <TaskAdditionSection onAddTask={handleAddTask}/>
        {tasks.map((task: Task) => (<TaskRow key={task.id} task={task} />))}

    </div>
}