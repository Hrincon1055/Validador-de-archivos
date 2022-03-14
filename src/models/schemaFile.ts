interface InterfaceFile {
  nameColumn: string;
  type: 'string' | 'number';
  required?: boolean;
  lengthMin?: number;
  lengthMax?: number;
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
