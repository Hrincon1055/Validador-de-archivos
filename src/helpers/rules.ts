import { InterfaceFile } from '../models/schemaFile';
import { regexMail, regxText, regexNumber } from '../constants/regex';
const indexFila: number = 1;
export const duplicateValue = (
  objFile: any,
  schema: InterfaceFile,
  errorsSet: Set<string>
): void => {
  let repetidos: string[] = [];
  let temporal: string[] = [];
  objFile[schema.name].forEach((value: string, index: number) => {
    temporal = Object.assign([], objFile[schema.name]);
    temporal.splice(index, 1);
    if (
      temporal.indexOf(value.toLowerCase().trim()) != -1 &&
      repetidos.indexOf(value.toLowerCase().trim()) == -1
    ) {
      repetidos.push(value.toLowerCase().trim());
    }
  });
  if (repetidos.length > 0) {
    errorsSet.add(
      `ERROR en la COLUMNA ${schema.name}, ${
        schema.message ? schema.message : 'Contiene valores duplicados.'
      } (${repetidos})`
    );
  }
};
export const validEmail = (
  objFile: any,
  schema: InterfaceFile,
  errorsSet: Set<string>
): void => {
  objFile[schema.name].forEach((value: string, index: number) => {
    !regexMail.test(value.toString().trim()) &&
      errorsSet.add(
        `ERROR en la COLUMNA ${schema.name}, FILA ${index + indexFila}, ${
          schema.message
            ? schema.message
            : `El correo: ${value.toString().trim()} no es valido.`
        }`
      );
  });
};
export const validMaxLength = (
  objFile: any,
  schema: InterfaceFile,
  errorsSet: Set<string>
): void => {
  objFile[schema.name].forEach((value: string, index: number) => {
    schema?.maxLength! < value.toString().trim().length &&
      errorsSet.add(
        `ERROR en la COLUMNA ${schema.name}, FILA ${index + indexFila}, ${
          schema.message
            ? schema.message
            : `El campo solo permite maximo ${schema?.maxLength} caracteres`
        }`
      );
  });
};

export const validMinLength = (
  objFile: any,
  schema: InterfaceFile,
  errorsSet: Set<string>
): void => {
  objFile[schema.name].forEach((value: string, index: number) => {
    schema?.minLength! > value.toString().trim().length &&
      errorsSet.add(
        `ERROR en la COLUMNA ${schema.name}, FILA ${index + indexFila}, ${
          schema.message
            ? schema.message
            : `El campo solo permite minimo ${schema?.minLength} caracteres`
        }`
      );
  });
};
export const validLength = (
  objFile: any,
  schema: InterfaceFile,
  errorsSet: Set<string>
): void => {
  objFile[schema.name].forEach((value: string, index: number) => {
    value.toString().trim().length !== schema?.length &&
      errorsSet.add(
        `ERROR en la COLUMNA ${schema.name}, FILA ${index + indexFila}, ${
          schema.message
            ? schema.message
            : 'El campo debe de tener el numero de caracteres indicado.'
        }(${schema?.length}).`
      );
  });
};
export const validInclude = (
  objFile: any,
  schema: InterfaceFile,
  errorsSet: Set<string>
): void => {
  objFile[schema.name].forEach((value: string, index: number) => {
    !schema?.include!.includes(value) &&
      errorsSet.add(
        `ERROR en la COLUMNA ${schema.name}, FILA ${index + indexFila}, ${
          schema.message
            ? schema.message
            : 'El campo solo puede incluir los siguientes valores.'
        } (${schema?.include}).`
      );
  });
};
export const validReg = (
  objFile: any,
  schema: InterfaceFile,
  errorsSet: Set<string>
): void => {
  objFile[schema.name].forEach((value: string, index: number) => {
    if (schema?.reg) {
      !schema?.reg.test(value) &&
        errorsSet.add(
          `ERROR en la COLUMNA ${schema.name}, FILA ${index + indexFila}, ${
            schema.message
              ? schema.message
              : 'El campo tiene errores para la exprecion regular indicada.'
          }`
        );
    }
  });
};
export const validRefIsGreaterDate = (
  objFile: any,
  schema: InterfaceFile,
  errorsSet: Set<string>
): void => {
  // TODO: validar que los nombre de fechas sean iguales
  objFile[schema.name].forEach(
    (valueFechaFin: string, indexFechaFin: number) => {
      objFile[schema?.refIsGreaterDate!].forEach(
        (valueFechaInicio: string, indexFechaInicio: number) => {
          if (indexFechaFin === indexFechaInicio) {
            new Date(valueFechaInicio) > new Date(valueFechaFin) &&
              errorsSet.add(
                `ERROR en la COLUMNA ${schema?.refIsGreaterDate}, FILA ${
                  indexFechaInicio + indexFila
                }, ${
                  schema.message
                    ? schema.message
                    : 'La fecha de inicio no puede ser mayor a la fecha fin.'
                }`
              );
          }
        }
      );
    }
  );
};
export const validTetx = (
  objFile: any,
  schema: InterfaceFile,
  errorsSet: Set<string>
): void => {
  objFile[schema.name].forEach((value: string, index: number) => {
    !regxText.test(value.toString().trim()) &&
      errorsSet.add(
        `ERROR en la COLUMNA ${schema.name}, FILA ${index + indexFila}, ${
          schema.message
            ? schema.message
            : `El Campo no puede contener caracteres expeciales.`
        }`
      );
  });
};

export const validNumber = (
  objFile: any,
  schema: InterfaceFile,
  errorsSet: Set<string>
): void => {
  objFile[schema.name].forEach((value: string, index: number) => {
    !regexNumber.test(value.toString().trim()) &&
      errorsSet.add(
        `ERROR en la COLUMNA ${schema.name}, FILA ${index + indexFila}, ${
          schema.message ? schema.message : `El Campo no es un numero valido.`
        }`
      );
  });
};
