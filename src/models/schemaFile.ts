interface InterfaceFile {
  nameColumn: string;
  required?: boolean;
  length?: number;
  reg?: object;
  includeString?: string[];
  unique?: boolean;
}
interface IFunctions {
  comparatorDate?: (startDate: any, endDate: any) => string;
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
