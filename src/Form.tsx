    export type FormFieldStatus = "untouched" | "touched" | "error";

    export interface FormFieldUpdate {
        value?: string;
        status?: FormFieldStatus;
        error?: string;
    }

    export interface FormFieldValiationRule {
        required?: boolean;
        minLength?: number;
        maxLength?: number;
    }

    export class Form {
        private readonly fieldValues: { [key: string]: string };
        private readonly fieldValidationRules: { [key: string]: FormFieldValiationRule };
        private readonly fieldStatuses: { [key: string]: FormFieldStatus };
        private readonly fieldErrors: { [key: string]: string };

        constructor(
            fieldValues: { [key: string]: string },
            fieldValidationRules: { [key: string]: FormFieldValiationRule } = {},
            fieldStatuses: { [key: string]: FormFieldStatus } = {},
            fieldErrors: { [key: string]: string } = {},
        ) {
            this.fieldValues = fieldValues;
            for (const name in fieldValues) {
                if (fieldValidationRules[name] == null) {
                    fieldValidationRules[name] = {};
                }
                if (fieldStatuses[name] == null) {
                    fieldStatuses[name] = "untouched";
                }
            }
            this.fieldStatuses = fieldStatuses;
            this.fieldValidationRules = fieldValidationRules;
            this.fieldErrors = fieldErrors;
        }
        isValid() {
            for (const key in this.fieldValues) {
                const fieldStatus = this.fieldStatuses[key];
                const fieldValidationRules = this.fieldValidationRules[key];
                if (fieldStatus === "untouched" && fieldValidationRules.required) {
                    return false;
                }
            }
            return true;
        }

        copy() {
            return new Form(this.fieldValues, this.fieldValidationRules, this.fieldStatuses);
        }

        withField(form: Form, fieldName: string, fieldUpdate: FormFieldUpdate) {
            const newForm = form.copy();
            if (fieldUpdate.value !== undefined) {
                newForm.fieldValues[fieldName] = fieldUpdate.value;
            }
            if (fieldUpdate.error !== undefined) {
                newForm.fieldStatuses[fieldName] = "error";
                newForm.fieldErrors[fieldName] = fieldUpdate.error;
            }
            if (fieldUpdate.status !== undefined) {
                newForm.fieldStatuses[fieldName] = fieldUpdate.status;
            }
            return newForm;
        }

        getFieldValue(fieldName: string) {
            return this.fieldValues[fieldName];
        }

        getFieldError(fieldName: string) {
            return this.fieldErrors[fieldName];
        }

        getFieldStatus(fieldName: string) {
            return this.fieldStatuses[fieldName];
        }

        isFieldRequired(fieldName: string) {
            return this.fieldValidationRules[fieldName].required;
        }

        getFieldMinLength(fieldName: string) {
            return this.fieldValidationRules[fieldName].minLength;
        }

        getFieldMaxLength(fieldName: string) {
            return this.fieldValidationRules[fieldName].maxLength;
        }
    }

