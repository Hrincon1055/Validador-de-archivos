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
      `Error columna ${schema.name.toUpperCase()}, ${
        schema.message ? schema.message : 'Contiene valores duplicados.'
      }`
    );
  }
};

export const validRequired = (
  objFile: any,
  schema: InterfaceFile,
  errorsSet: Set<string>
): void => {
  objFile[schema.name].forEach((value: string, index: number) => {
    value.toString().trim().length === 0 &&
      errorsSet.add(
        messageError(schema.name, index + indexFila, 'El campo es requerido')
      );
  });
};

export const validEmail = (
  objFile: any,
  schema: InterfaceFile,
  errorsSet: Set<string>
): void => {
  objFile[schema.name].forEach((value: string, index: number) => {
    !regexMail.test(value.toString().trim()) &&
      errorsSet.add(
        messageError(schema.name, index + indexFila, 'El correo no es valido')
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
        messageError(
          schema.name,
          index + indexFila,
          'El campo tiene una longitud maxima de caracteres'
        )
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
        messageError(
          schema.name,
          index + indexFila,
          'El campo tiene una longitud minima de caracteres'
        )
        // `ERROR en la COLUMNA ${schema.name}, FILA ${index + indexFila}, ${
        //   schema.message
        //     ? schema.message
        //     : `El campo solo permite minimo ${schema?.minLength} caracteres`
        // }`
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
        messageError(
          schema.name,
          index + indexFila,
          'El campo debe de tener el numero de caracteres indicado'
        )
        // `ERROR en la COLUMNA ${schema.name}, FILA ${index + indexFila}, ${
        //   schema.message
        //     ? schema.message
        //     : 'El campo debe de tener el numero de caracteres indicado.'
        // }(${schema?.length}).`
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
        messageError(
          schema.name,
          index + indexFila,
          'El campo contine valores no validos'
        )
        // `ERROR en la COLUMNA ${schema.name}, FILA ${index + indexFila}, ${
        //   schema.message
        //     ? schema.message
        //     : 'El campo solo puede incluir los siguientes valores.'
        // } (${schema?.include}).`
      );
  });
};
export const validReg = (
  objFile: any,
  schema: InterfaceFile,
  errorsSet: Set<string>
): void => {
  objFile[schema.name].forEach((value: string, index: number) => {
    if (schema?.regex) {
      console.log('rules LINE 127 =>', schema?.regex.reg.test(value));
      !schema?.regex.reg.test(value.toString()) &&
        errorsSet.add(
          messageError(schema.name, index + indexFila, schema?.regex.message)
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
                messageError(
                  schema?.refIsGreaterDate!,
                  indexFechaInicio + indexFila,
                  'La fecha de inicio no puede ser mayor a la fecha fin'
                )
                // `ERROR en la COLUMNA ${schema?.refIsGreaterDate}, FILA ${
                //   indexFechaInicio + indexFila
                // }, ${
                //   schema.message
                //     ? schema.message
                //     : 'La fecha de inicio no puede ser mayor a la fecha fin.'
                // }`
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
        messageError(
          schema.name,
          index + indexFila,
          'El Campo no puede contener caracteres expeciales'
        )
        // `ERROR en la COLUMNA ${schema.name}, FILA ${index + indexFila}, ${
        //   schema.message
        //     ? schema.message
        //     : `El Campo no puede contener caracteres expeciales.`
        // }`
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
        messageError(
          schema.name,
          index + indexFila,
          'El Campo no es un numero valido'
        )
        // `ERROR en la COLUMNA ${schema.name}, FILA ${index + indexFila}, ${
        //   schema.message ? schema.message : `El Campo no es un numero valido.`
        // }`
      );
  });
};
export const validDateFormatReg = (
  objFile: any,
  schema: InterfaceFile,
  errorsSet: Set<string>
): void => {
  objFile[schema.name].forEach((value: string, index: number) => {
    if (schema?.dateFormatReg) {
      !schema?.dateFormatReg.test(value) &&
        errorsSet.add(
          messageError(
            schema.name,
            index + indexFila,
            'El formato de la fecha no concuerda con la requerida'
          )
          // `ERROR en la COLUMNA ${schema.name}, FILA ${index + indexFila}, ${
          //   schema.message
          //     ? schema.message
          //     : 'El formato de la fecha no concuerda con la requerida.'
          // }`
        );
    }
  });
};
export const validConditionalData = (
  objFile: any,
  schema: InterfaceFile,
  errorsSet: Set<string>
): void => {
  if (schema.conditionalData?.refName) {
    objFile[schema.conditionalData?.refName].forEach(
      (refValue: string, refIndex: number) => {
        objFile[schema.name].forEach((value: string, index: number) => {
          if (refIndex === index) {
            if (
              value.trim() !==
              schema.conditionalData?.objValidator[refValue].trim()
            ) {
              errorsSet.add(
                messageError(
                  schema.name,
                  refIndex + indexFila,
                  `El campo solo puede contener datos validados por el campo ${schema.conditionalData?.refName}`
                )
                // `ERROR en la COLUMNA ${schema.name}, FILA ${
                //   refIndex + indexFila
                // }, ${
                //   schema.message
                //     ? schema.message
                //     : `El campo solo puede contener datos validados por el campo ${schema.conditionalData?.refName}`
                // }`
              );
            }
          }
        });
      }
    );
  }
};
const messageError = (
  nameFila: string,
  numberFila: number,
  message: string = ''
): string => {
  return `Error columna ${nameFila.toUpperCase()} Fila ${numberFila}. ${message}`;
};
