import type Task from "./Task.ts";
import Input from "./Input.tsx";
import {useState} from "react";
import Button from "./Button.tsx";
import {type Form, formIsValid} from "./Form.tsx";

interface TaskFormProps {
    onAddTask: (task: Task) => void;
    onCancel: () => void;
    task: Task | null;
}

export default function TaskForm(props: TaskFormProps) {
    const [form, setForm] = useState<Form>({fields: {name: {name: "name", value: props.task ? props.task.name : "", status: "untouched", required: true}}});
    const isValid = formIsValid(form);

    function handleSubmit() {
        props.onAddTask({name: form.fields.name.value, id: undefined});
    }

    function handleCancel(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
        e.preventDefault();
        props.onCancel();
    }

    return <form onSubmit={handleSubmit}
                 className="grid grid-cols-3 gap-2 max-w-xl">
        <Input name="name"
               form={form}
               setForm={setForm} />
        <Button disabled={!isValid}>
            Save
        </Button>
        <Button onClick={handleCancel}>
            Cancel
        </Button>
    </form>
}
