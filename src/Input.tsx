import { type Form, type FormFieldStatus } from "./Form.tsx";

export interface InputProps {
  form: Form;
  setForm: (form: Form) => void;
  name: string;
}

export default function Input(props: InputProps) {
  function handleInput(e: React.ChangeEvent<HTMLInputElement>) {
    const value = e.currentTarget.value;
    const status: FormFieldStatus = "touched";
    props.setForm(
      props.form.withField(props.form, props.name, { status, value }),
    );
  }

  return (
    <input
      type="text"
      name={props.name}
      value={props.form.getFieldValue(props.name)}
      onInput={handleInput}
      className={`bg-blue-50 border-blue-100 py-2 px-5 
        focus-visible:outline-0 border-2 rounded-md 
        ${props.form.getFieldStatus(props.name) == "error" && "border-amber-600"}`}
    />
  );
}
