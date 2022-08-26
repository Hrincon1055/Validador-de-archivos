import { InterfaceFile } from './schemaFile';
import {
  fileConverterRules,
  fileConverterObject,
} from '../helpers/fileConverter';

import {
  validLength,
  validInclude,
  validRequired,
  validReg,
  validRefIsGreaterDate,
  duplicateValue,
  validEmail,
  validMaxLength,
  validMinLength,
  validTetx,
  validNumber,
  validDateFormatReg,
  validConditionalData,
  validMajorToday,
  validMinorToday,
  validConditionalLength,
} from '../helpers/rules';

export const validateFile = (
  schema: InterfaceFile[],
  fileUpload: any,
  separator: ';' | ',' = ';'
): Promise<{ fileErrors: string[]; dataFile: string[]; infoFile: File }> => {
  return new Promise((resolve, reject) => {
    const infoFile: File = fileUpload.target.files[0];
    const typeFile: string = fileUpload.target.files[0].name
      .split('.')
      .slice(
        fileUpload.target.files[0].name.split('.').length - 1,
        fileUpload.target.files[0].name.split('.').length
      )[0];
    let dataFile: string[] = [];
    const reader = new FileReader();
    reader.readAsText(infoFile, 'ISO-8859-1');
    reader.onload = () => {
      let data = reader.result;
      dataFile = (<string>data).split(/\r\n|\n/);
      try {
        let dataError = new Set<string>();
        let fileErrors: any[] = [];
        let objFile: Object = {};
        let prueba: Object = {};
        if (typeFile !== 'csv') {
          reject('Error: El tipo de archivo no es permitido.');
          return;
        }
        if (dataFile[0].split(separator).length !== schema.length) {
          reject('Error: El esquema no concuerda con los datos del archivo.');
          return;
        }
        prueba = fileConverterObject(dataFile, schema, separator);
        objFile = fileConverterRules(dataFile, schema, separator);
        schema.forEach((schema: InterfaceFile) => {
          if (schema.unique && schema.unique === true) {
            duplicateValue(objFile, schema, dataError);
          }
          if (schema.required && schema.required === true) {
            validRequired(objFile, schema, dataError);
          }
          if (schema.length && schema.length! > 0) {
            validLength(objFile, schema, dataError);
          }
          if (schema.include && schema?.include.length! > 0) {
            validInclude(objFile, schema, dataError);
          }
          if (schema.regex) {
            validReg(objFile, schema, dataError);
          }
          if (schema.dateValidations?.refIsGreaterDateNane) {
            validRefIsGreaterDate(objFile, schema, dataError);
          }
          if (schema.minLength && schema.minLength > 0) {
            validMinLength(objFile, schema, dataError);
          }
          if (schema.maxLength && schema.maxLength > 0) {
            validMaxLength(objFile, schema, dataError);
          }
          if (schema.isEmail && schema.isEmail === true) {
            validEmail(objFile, schema, dataError);
          }
          if (schema.isText && schema.isText === true) {
            validTetx(objFile, schema, dataError);
          }
          if (schema.isNumber && schema.isNumber === true) {
            validNumber(objFile, schema, dataError);
          }
          if (schema.dateValidations?.dateFormatReg) {
            validDateFormatReg(objFile, schema, dataError);
          }
          if (schema.conditionalData) {
            validConditionalData(objFile, schema, dataError);
          }
          if (schema.conditionalLength) {
            validConditionalLength(objFile, schema, dataError);
          }
          if (schema.dateValidations?.majorToday) {
            validMajorToday(objFile, schema, dataError);
          }
          if (schema.dateValidations?.minorToday) {
            validMinorToday(objFile, schema, dataError);
          }
        });
        fileErrors = Array.from(new Set(dataError));
        resolve({
          fileErrors,
          dataFile,
          infoFile,
        });
      } catch (error) {
        console.log(error);
        reject('Los nombre para las referencias entre columnas no concuerdan.');
      }
    };
  });
};
