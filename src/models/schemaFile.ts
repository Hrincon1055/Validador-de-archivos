interface InterfaceFile {
  nameColumn: string;
  required?: boolean;
  length?: number;
  reg?: object;
  includeString?: string[];
}
interface IFunctions {
  (num1: number, num2: number): void;
}
export class SchemaFile {
  private modelFile: InterfaceFile[];

  constructor(model: InterfaceFile[], prueba: Function = function () {}) {
    this.modelFile = model;
    prueba(this.modelFile[0].nameColumn);
  }
  get getFileModelSchema() {
    return this.modelFile;
  }
  comparato(item1: any, item2: any) {
    console.log('schemaFile LINE 20 =>', item1, item2);
  }
}
