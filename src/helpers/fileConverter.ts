import { InterfaceFile } from '../models/schemaFile';
export const fileConverter = (
  dataFile: string[],
  schema: InterfaceFile[],
  separator: string
): any => {
  let objFile: any = {};
  let arrRowTemp: string[] = [];
  dataFile.forEach((dataFile) => {
    arrRowTemp = dataFile.split(separator);
    arrRowTemp.forEach((arrRowTemp, rowItemIndex) => {
      schema.forEach((schema, schemaIndex) => {
        if (schemaIndex === rowItemIndex) {
          if (!objFile.hasOwnProperty([schema.name])) {
            objFile = {
              ...objFile,
              [schema.name]: [],
            };
          }
          objFile[schema.name].push(arrRowTemp);
        }
      });
    });
  });
  return objFile;
};
