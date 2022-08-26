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
  return objFile;
};
export const fileConverterObject = (
  dataFile: string[],
  schema: InterfaceFile[],
  separator: string
): any => {
  let objFile: any = {};
  let dataObjFile: any[] = [];
  let arrRowTemp: string[] = [];
  let countBeneficiarioColumn: number = 0;
  let countBeneficiarioRow: number = 0;
  dataFile.forEach((dataFile: string, indexFile: number) => {
    arrRowTemp = dataFile.split(separator);
    let obj: any = {};
    let objBeneficiario1: any = {};
    let objBeneficiario2: any = {};
    let objBeneficiario3: any = {};
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
              obj[schema.group?.nameGroup] = [];
            }
            if (
              schema.group?.type === 'array' &&
              indexFile >= 0 &&
              schema.group?.index! <= countBeneficiarioColumn
            ) {
              if (
                schema.group?.index! === 0 &&
                indexFile === countBeneficiarioRow
              ) {
                if (!objBeneficiario1.hasOwnProperty([schema.name])) {
                  objBeneficiario1 = {
                    ...objBeneficiario1,
                    [schema.name]: arrRowTemp,
                  };
                }
              }
              obj[schema.group?.nameGroup].push(objBeneficiario1);
            }
            if (
              schema.group?.type === 'array' &&
              indexFile >= 0 &&
              schema.group?.index! <= countBeneficiarioColumn
            ) {
              if (
                schema.group?.index! === 1 &&
                indexFile === countBeneficiarioRow
              ) {
                if (!objBeneficiario2.hasOwnProperty([schema.name])) {
                  objBeneficiario2 = {
                    ...objBeneficiario2,
                    [schema.name]: arrRowTemp,
                  };
                }
              }
              obj[schema.group?.nameGroup].push(objBeneficiario2);
            }
            if (
              schema.group?.type === 'array' &&
              indexFile >= 0 &&
              schema.group?.index! <= countBeneficiarioColumn
            ) {
              if (
                schema.group?.index! === 2 &&
                indexFile === countBeneficiarioRow
              ) {
                if (!objBeneficiario3.hasOwnProperty([schema.name])) {
                  objBeneficiario3 = {
                    ...objBeneficiario3,
                    [schema.name]: arrRowTemp,
                  };
                }
              }
              obj[schema.group?.nameGroup].push(objBeneficiario3);
            }
          }
        }
      });
      countBeneficiarioColumn++;
    });
    countBeneficiarioRow++;
    dataObjFile.push(obj);
  });

  // for (let index = 0; index < Array(4).length; index++) {
  //   console.log('fileConverter LINE 106 =>', index);
  // }
  console.log('fileConverter LINE 97 =>', dataObjFile);
  return objFile;
};
