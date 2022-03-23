interface InterfaceFile {
  name: string;
  index: number;
  required?: boolean;
  length?: number;
  reg?: object;
  include?: string[];
  unique?: boolean;
  message?: string;
}

export class SchemaFile {
  private modelFile: InterfaceFile[];
  constructor(model: InterfaceFile[]) {
    this.modelFile = model;
  }
  get getFileModelSchema() {
    return this.modelFile;
  }
}
