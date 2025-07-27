export type FormFieldStatus = "untouched" | "touched" | "error";
export interface FormField {
    name: string;
    value: string;
    status: FormFieldStatus;
    required?: boolean;
    error?: string;
}

export interface Form {
    fields: {[key: string]: FormField};
}

export function formIsValid(form: Form) {
    for (const key in form.fields) {
        const field = form.fields[key];
        if (field.status === "untouched" && field.required) {
            return false;
        }
        if (field.status === "error") {
            return false;
        }
    }
    return true;
}
