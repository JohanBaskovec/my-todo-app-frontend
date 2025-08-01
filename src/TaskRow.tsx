import type Task from "./Task.ts";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import axios from "axios";
import {tasksListOptions} from "./queries.ts";

interface TaskRowProps {
    task: Task,
    done: boolean
}

export default function TaskRow(props: TaskRowProps) {
    const queryClient = useQueryClient();

    const putTaskQuery = useMutation({
        mutationFn: (newTask) => {
            if (newTask.id == null) {
                throw new Error("newTask has no id. This should not be possible.");
            }
            return axios.put(`http://localhost:8081/task/${newTask.id}`, newTask)
        },
        onMutate: (newTask: Task) => {
            const previousTasks: Task[] | undefined = queryClient.getQueryData(tasksListOptions.queryKey);

            if (previousTasks) {
                queryClient.setQueryData(tasksListOptions.queryKey, [newTask, ...previousTasks.filter((task: Task) => {
                    return task.id != newTask.id;
                })]);
            }

            return {previousTasks}
        },
        onError: (_err, _variables, context) => {
            if (context?.previousTasks) {
                queryClient.setQueryData<Task[]>(tasksListOptions.queryKey, context.previousTasks)
            }
        },
    });
    function handleChange() {
        const newTask = {...props.task, done: !props.done};
        putTaskQuery.mutate(newTask);
    }
    return <div className="py-1 grid grid-cols-[1em_auto] gap-1">
        <div className="px-1">

            <input type="checkbox"
                   className="cursor-pointer
                   accent-blue-600 hover:accent-blue-500
                   transition-colors
                   "
                   checked={props.done}
                   onChange={handleChange}
            />
        </div>
        <div className={`px-1 ${props.task.done && "line-through"}`}>
            {props.task.name}
        </div>
    </div>;
}

