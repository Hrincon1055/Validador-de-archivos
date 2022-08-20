import { InterfaceFile } from '../models/schemaFile';
export const fileConverterRules = (
  dataFile: string[],
  schema: InterfaceFile[],
  separator: string
): any => {
  let objFile: any = {};
  let arrRowTemp: string[] = [];
  dataFile.forEach((dataFile: string) => {
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
  // console.log('fileConverter LINE 25 =>', objFile);
  return objFile;
};
export const fileConverterObject = (
  dataFile: string[],
  schema: InterfaceFile[],
  separator: string
): any => {
  let objFile: any = {};
  let data: any[] = [];
  let arrRowTemp: string[] = [];
  dataFile.forEach((dataFile: string, indexFile: number) => {
    arrRowTemp = dataFile.split(separator);
    let obj: any = {};
    let temp: any = {};
    schema.forEach((schema: InterfaceFile, schemaIndex: number) => {
      arrRowTemp.forEach((arrRowTemp: string, rowItemIndex: number) => {
        if (schemaIndex === rowItemIndex) {
          if (schema.group) {
            if (schema.group?.type === 'object') {
              if (!obj.hasOwnProperty([schema.name])) {
                obj[schema.group?.nameGroup] = {
                  ...obj[schema.group?.nameGroup],
                  [schema.name]: arrRowTemp,
                };
              }
            }
            if (schema.group?.type === 'array') {
              if (!obj.hasOwnProperty([schema.name])) {
                if (!temp.hasOwnProperty([schema.name])) {
                  temp = { ...temp, [schema.name]: arrRowTemp };
                }
                obj[schema.group?.nameGroup] = [];
              }
            }
          }
        }
      });
    });
    console.log('fileConverter LINE 64 =>', temp);
    data.push(obj);
  });
  console.log('fileConverter LINE 97 =>', data);

  return objFile;
  ``;
};
