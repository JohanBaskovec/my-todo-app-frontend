import type Task from "./Task.ts";
import Input from "./Input.tsx";
import {useState} from "react";
import Button from "./Button.tsx";
import {Form} from "./Form.tsx";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import axios, {type AxiosResponse} from "axios";
import {tasksListOptions} from "./queries.ts";

interface TaskFormProps {
    onCancel: () => void;
    task: Task | null;
}

export default function TaskForm(props: TaskFormProps) {
    const queryClient = useQueryClient();
    const taskPostQuery = useMutation({
        mutationFn: (newTask) => {
            return axios.post('http://localhost:8081/task', newTask);
        },
        onMutate: async (newTask: Task) => {
            setForm(
                new Form(
                    {
                        name: props.task ? props.task.name : ""
                    },
                    {
                        name: {required: true}
                    }
                )
            );
            await queryClient.cancelQueries(tasksListOptions);

            const previousTasks = queryClient.getQueryData(tasksListOptions.queryKey);

            // we optimistically add the task with a random ID, that we then use to find
            // the task again and update it with the server's response (in onSuccess)
            const newTaskWithFakeId = {...newTask, id: Math.random()};
            if (previousTasks) {
                queryClient.setQueryData(tasksListOptions.queryKey, [
                    newTaskWithFakeId,
                    ...previousTasks,
                ]);
            }

            return {previousTasks, newTaskWithFakeId};
        },
        onSuccess: (response: AxiosResponse<Task>, _variables, context) => {
            const previousTasks = queryClient.getQueryData(tasksListOptions.queryKey);
            if (previousTasks) {
                queryClient.setQueryData(tasksListOptions.queryKey, previousTasks.map((oldTask) => {
                    if (oldTask.id == context.newTaskWithFakeId.id) {
                        return response.data;
                    } else {
                        return oldTask;
                    }
                }));
            }
        },
        onError: (_err, _variables, context) => {
            if (context?.previousTasks) {
                queryClient.setQueryData<Task[]>(tasksListOptions.queryKey, context.previousTasks)
            }
        },
    });
    const [form, setForm] = useState<Form>(
        new Form(
            {
                name: props.task ? props.task.name : ""
            },
            {
                name: {required: true}
            }
        )
    );

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        taskPostQuery.mutate({name: form.getFieldValue("name"), id: undefined, done: false});
    }

    function handleCancel(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
        e.preventDefault();
        props.onCancel();
    }

    return <form onSubmit={handleSubmit}
                 className="grid grid-cols-3 gap-2 max-w-xl">
        <Input name="name"
               form={form}
               setForm={setForm}/>
        <Button disabled={!form.isValid() || taskPostQuery.isPending}>
            Save
        </Button>
        <Button onClick={handleCancel}>
            Cancel
        </Button>
    </form>
}
