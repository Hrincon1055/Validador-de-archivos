export interface InterfaceFile {
  name: string;
  required?: boolean;
  length?: number;
  reg?: any;
  include?: string[];
  unique?: boolean;
  message?: string;
  refIsGreaterDate?: string;
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
