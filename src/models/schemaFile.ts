export interface InterfaceFile {
  name: string;
  required?: boolean;
  length?: number;
  include?: string[];
  unique?: boolean;
  maxLength?: number;
  minLength?: number;
  isEmail?: boolean;
  isText?: boolean;
  isNumber?: boolean;
  regex?: Regex;
  dateValidations?: DateValidations;
  conditionalData?: ConditionalData;
  conditionalLength?: ConditionalLength;
  group?: { nameGroup: string; type: 'array' | 'object'; index?: number };
}
export interface ConditionalData {
  refName: string;
  objValidator: {
    [key: string]: string;
  };
}
export interface ConditionalLength {
  refName: string;
  objValidator: {
    [key: string]: number;
  };
}
export interface DateValidations {
  dateFormatReg: RegExp;
  dateFormatString?: FormatsDate;
  refIsGreaterDateNane?: string;
  majorToday?: boolean;
  minorToday?: boolean;
}
export interface Regex {
  reg: RegExp;
  message: string;
}
export type FormatsDate = 'YYYY-MM-DD' | 'MM/DD/YYYY' | 'DD MM YYYY';

export class SchemaFile {
  private modelFile: InterfaceFile[];
  constructor(model: InterfaceFile[]) {
    this.modelFile = model;
  }
  get getFileModelSchema(): InterfaceFile[] {
    return this.modelFile;
  }
}
