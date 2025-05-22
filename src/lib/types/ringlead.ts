import { Json } from "./definitions";

export type RingLeadInstantBookInit = (
  uuid: string,
  task_id: number,
  org_id: number,
  environment: number,
  isFormValid?: () => boolean,
) => void;

export type RingLeadInstantBookCallback = (form_values: Json) => void;
