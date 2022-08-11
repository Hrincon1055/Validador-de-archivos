export interface InterfaceFile {
  name: string;
  required?: boolean;
  length?: number;
  regex?: { reg: RegExp; message: string };
  include?: string[];
  unique?: boolean;
  message?: string;
  refIsGreaterDate?: string;
  maxLength?: number;
  minLength?: number;
  isEmail?: boolean;
  isText?: boolean;
  isNumber?: boolean;
  dateFormatReg?: RegExp;
  conditionalData?: ConditionalData;
  group?: string;
}
export interface ConditionalData {
  refName: string;
  objValidator: {
    [key: string]: string;
  };
}
export type FormatsDate = 'YYYY-MM-DD' | 'MM/DD/YYYY';

export class SchemaFile {
  private modelFile: InterfaceFile[];
  constructor(model: InterfaceFile[]) {
    this.modelFile = model;
  }
  get getFileModelSchema(): InterfaceFile[] {
    return this.modelFile;
  }
}
