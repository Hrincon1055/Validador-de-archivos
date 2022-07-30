export interface InterfaceFile {
  name: string;
  required?: boolean;
  length?: number;
  reg?: RegExp;
  include?: string[];
  unique?: boolean;
  message?: string;
  refIsGreaterDate?: string;
  maxLength?: number;
  minLength?: number;
  isEmail?: boolean;
  isText?: boolean;
  isNumber?: boolean;
  formatterDate?: RegExp;
}

export class SchemaFile {
  private modelFile: InterfaceFile[];
  constructor(model: InterfaceFile[]) {
    this.modelFile = model;
  }
  get getFileModelSchema(): InterfaceFile[] {
    return this.modelFile;
  }
}
