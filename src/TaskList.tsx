import type Task from "./Task.ts";
import TaskRow from "./TaskRow.tsx";
import {useState} from "react";
import TaskAdditionSection from "./TaskAdditionSection.tsx";


const defaultTasks: Task[] = [{id: 1, name: 'Complete my portfolio', completed: false},
    {id: 2, name: 'Apply for jobs', completed: false}
];
let nextId = 3;

export default function TaskList() {
    const [tasks, setTasks] = useState<Task[]>(defaultTasks);

    function handleAddTask(task: Task) {
        setTasks([{
           id: nextId++,
            name: task.name,
            completed: task.completed,
        }, ...tasks]);
    }

    function handleCheckboxChange(taskId: number, completed: boolean) {
        setTasks(tasks.map((task) => {
            if (task.id == taskId) {
                return {...task, completed: completed};
            } else {
                return task;
            }
        }))
    }

    return <div>
        <div className="text-2xl text-gray-950">TODOs</div>
        <TaskAdditionSection onAddTask={handleAddTask}/>
        {
            tasks.map((task: Task) => {
                if (!task.completed) {
                    return <TaskRow key={task.id}
                                    task={task}
                                    completed={task.completed}
                                    onCheckboxChange={handleCheckboxChange}
                    />;
                }
            })
        }
        {
            tasks.map((task: Task) => {
                if (task.completed) {
                    return <TaskRow key={task.id}
                                    task={task}
                                    completed={task.completed}
                                    onCheckboxChange={handleCheckboxChange}
                    />;
                }
            })
        }

    </div>
}