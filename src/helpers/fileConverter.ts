import * as moment from 'moment';
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
    arrRowTemp.forEach((arrRowTemp: string, rowItemIndex: number) => {
      schema.forEach((schema: InterfaceFile, schemaIndex: number) => {
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
  console.log(moment('01-09-2022', 'DD-MM-YYYY'));

  return objFile;
};
