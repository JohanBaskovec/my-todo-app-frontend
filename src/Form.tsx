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
  private readonly fieldValues: Record<string, string>;
  private readonly fieldValidationRules: Record<string, FormFieldValiationRule>;
  private readonly fieldStatuses: Record<string, FormFieldStatus>;
  private readonly fieldErrors: Record<string, string>;

  constructor(
    fieldValues: Record<string, string>,
    fieldValidationRules: Record<string, FormFieldValiationRule> = {},
    fieldStatuses: Record<string, FormFieldStatus> = {},
    fieldErrors: Record<string, string> = {},
  ) {
    this.fieldValues = fieldValues;
    for (const name in fieldValues) {
      fieldValidationRules[name] ??= {};
      fieldStatuses[name] ??= "untouched";
    }
    this.fieldStatuses = fieldStatuses;
    this.fieldValidationRules = fieldValidationRules;
    this.fieldErrors = fieldErrors;
  }
  isValid() {
    for (const key in this.fieldValues) {
      const fieldStatus = this.fieldStatuses[key];
      const fieldValue = this.fieldValues[key];
      const fieldValidationRules = this.fieldValidationRules[key];
      if (fieldValidationRules.required) {
        if (fieldStatus == "untouched" || fieldValue.length == 0) {
          return false;
        }
      }
    }
    return true;
  }

  copy() {
    return new Form(
      this.fieldValues,
      this.fieldValidationRules,
      this.fieldStatuses,
    );
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
