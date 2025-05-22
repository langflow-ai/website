export type MarketoFormId = string | number;

export interface MarketoAPI {
  loadForm: (
    baseUrl: string,
    MUNCHKIN_ID: string,
    formId: MarketoFormId,
    callback: (form: MarketoForm) => void,
  ) => void;
  getForm: (formId: MarketoFormId) => MarketoForm;
  allForms: () => MarketoForm[];
}

export interface MarketoForm {
  getId: () => number;
  getFormElem: () => any;
  validate: () => boolean;
  onValidate: (callback: (validated: boolean) => void) => MarketoForm;
  submit: () => MarketoForm;
  onFormRender: (callback: (form: MarketoForm) => void) => MarketoForm;
  onSubmit: (callback: (form: MarketoForm) => void) => MarketoForm;
  onSuccess: (
    callback: (values: Record<string, any>, url: string | null) => void,
  ) => MarketoForm;
  submittable: (canSubmit?: boolean) => MarketoForm | boolean;
  allFieldsFilled: () => boolean;
  setValues: (values: Record<string, any>) => void;
  getValues: () => Record<string, any>;
  addHiddenFields: (values: Record<string, any>) => void;
  vals: (vals?: Record<string, any>) => Record<string, any>;
  showErrorMessage: (msg: string, elem?: any) => MarketoForm;
}
