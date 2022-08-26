import { InterfaceFile } from '../models/schemaFile';
import { regexMail, regxText, regexNumber } from '../constants/regex';
import * as moment from 'moment';
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
      `Error columna ${schema.name.toUpperCase()}, Contiene valores duplicados.`
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
  objFile[schema.name].forEach(
    (valueFechaFin: string, indexFechaFin: number) => {
      objFile[schema?.dateValidations?.refIsGreaterDateNane!].forEach(
        (valueFechaInicio: string, indexFechaInicio: number) => {
          if (indexFechaFin === indexFechaInicio) {
            let valueFechaInicioMoment = moment(
              valueFechaInicio,
              schema?.dateValidations?.dateFormatString
            );
            let valueFechaFinMoment = moment(
              valueFechaFin,
              schema?.dateValidations?.dateFormatString
            );
            let diffDate = valueFechaFinMoment.diff(
              valueFechaInicioMoment,
              'days'
            );
            if (diffDate < 0) {
              errorsSet.add(
                messageError(
                  schema?.dateValidations?.refIsGreaterDateNane!,
                  indexFechaInicio + indexFila,
                  'La fecha de inicio no puede ser mayor a la fecha fin'
                )
              );
            }
          }
        }
      );
    }
  );
};

export const validMajorToday = (
  objFile: any,
  schema: InterfaceFile,
  errorsSet: Set<string>
): void => {
  objFile[schema.name].forEach((value: string, index: number) => {
    if (schema?.dateValidations?.majorToday) {
      let today = moment().format(schema?.dateValidations?.dateFormatString);
      let valueFechaInicioMoment = moment(
        today,
        schema?.dateValidations?.dateFormatString
      );
      let valueFechaFinMoment = moment(
        value,
        schema?.dateValidations?.dateFormatString
      );
      let diffDate = valueFechaFinMoment.diff(valueFechaInicioMoment, 'days');
      if (diffDate < 0) {
        errorsSet.add(
          messageError(
            schema?.name,
            index + indexFila,
            'La fecha tiene que ser mayor a la fecha actual'
          )
        );
      }
    }
  });
};
export const validMinorToday = (
  objFile: any,
  schema: InterfaceFile,
  errorsSet: Set<string>
): void => {
  objFile[schema.name].forEach((value: string, index: number) => {
    if (schema?.dateValidations?.minorToday) {
      let today = moment().format(schema?.dateValidations?.dateFormatString);
      let valueFechaInicioMoment = moment(
        today,
        schema?.dateValidations?.dateFormatString
      );
      let valueFechaFinMoment = moment(
        value,
        schema?.dateValidations?.dateFormatString
      );
      let diffDate = valueFechaFinMoment.diff(valueFechaInicioMoment, 'days');
      if (diffDate > 0) {
        errorsSet.add(
          messageError(
            schema?.name,
            index + indexFila,
            'La fecha tiene que ser menor a la fecha actual'
          )
        );
      }
    }
  });
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
      );
  });
};
export const validDateFormatReg = (
  objFile: any,
  schema: InterfaceFile,
  errorsSet: Set<string>
): void => {
  objFile[schema.name].forEach((value: string, index: number) => {
    if (schema?.dateValidations?.dateFormatReg) {
      !schema?.dateValidations?.dateFormatReg.test(value) &&
        errorsSet.add(
          messageError(
            schema.name,
            index + indexFila,
            'El formato de la fecha no concuerda con la requerida'
          )
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
              );
            }
          }
        });
      }
    );
  }
};
export const validConditionalLength = (
  objFile: any,
  schema: InterfaceFile,
  errorsSet: Set<string>
): void => {
  if (schema.conditionalLength?.refName) {
    objFile[schema.conditionalLength?.refName].forEach(
      (refValue: string, refIndex: number) => {
        objFile[schema.name].forEach((value: string, index: number) => {
          if (refIndex === index) {
            if (
              value.trim().length !==
              schema.conditionalLength?.objValidator[refValue]
            ) {
              errorsSet.add(
                messageError(
                  schema.name,
                  refIndex + indexFila,
                  `El campo de debe contener ${schema.conditionalLength?.objValidator[refValue]} caracteres`
                )
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
  return `Error columna ${nameFila
    .toUpperCase()
    .replace('_', ' ')} Fila ${numberFila}. ${message}.`;
};
