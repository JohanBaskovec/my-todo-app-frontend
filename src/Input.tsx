import type {Form, FormFieldStatus} from "./Form.tsx";

export interface InputProps {
    form: Form;
    setForm: (form: Form) => void;
    name: string;
}

export default function Input(props: InputProps) {
    function handleInput(e: React.ChangeEvent<HTMLInputElement>) {
        const newValue = e.currentTarget.value;
        let status: FormFieldStatus = "touched";
        if (props.form.fields[props.name].required && newValue.length == 0) {
            status = "error";
        }
        props.setForm({...props.form, fields: {...props.form.fields, name: {...props.form.fields[props.name], status: status, value: newValue}}});
    }

    return <input
        type="text"
        name={props.name}
        value={props.form.fields[props.name].value}
        onInput={handleInput}
        className={`bg-blue-50 border-blue-100 py-2 px-5 focus-visible:outline-0 border-2 rounded-md ${props.form.fields[props.name].status == "error" && "border-amber-600"}`}
    />;
}