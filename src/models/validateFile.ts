import { InterfaceFile } from './schemaFile';

export const validateFile = (
  schema: InterfaceFile[],
  fileUpload: any,
  separator: string = ';'
) => {
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
    reader.readAsText(infoFile);
    reader.onload = () => {
      let data = reader.result;
      dataFile = (<string>data).split(/\r\n|\n/);
      try {
        let dataError = new Set();
        let arrRowTemp: string[] = [];
        let errorsFile: any[] = [];
        let objFile: any = {};
        if (typeFile !== 'csv') {
          reject('Error: El tipo de archivo no es permitido.');
          return;
        }
        if (dataFile[0].split(separator).length !== schema.length) {
          reject('Error: El squema no concuerda con los datos del archivo.');
          return;
        }
        for (
          let dataFileRowIndex = 0;
          dataFileRowIndex < dataFile.length;
          dataFileRowIndex++
        ) {
          arrRowTemp = dataFile[dataFileRowIndex].split(';');
          for (
            let rowItemIndex = 0;
            rowItemIndex < arrRowTemp.length;
            rowItemIndex++
          ) {
            for (
              let schemaIndex = 0;
              schemaIndex < schema.length;
              schemaIndex++
            ) {
              if (schemaIndex === rowItemIndex) {
                if (!objFile.hasOwnProperty([schema[schemaIndex].name])) {
                  objFile = {
                    ...objFile,
                    [schema[schemaIndex].name]: [],
                  };
                }
                objFile[schema[schemaIndex].name].push(arrRowTemp[schemaIndex]);
              }
            }
          }
        }
        for (let schemaIndex = 0; schemaIndex < schema.length; schemaIndex++) {
          if (schema[schemaIndex]?.unique) {
            let repetidos: string[] = [];
            let temporal: string[] = [];
            objFile[schema[schemaIndex].name].forEach(
              (value: string, index: number) => {
                temporal = Object.assign([], objFile[schema[schemaIndex].name]);
                temporal.splice(index, 1);
                if (
                  temporal.indexOf(value.toLowerCase().trim()) != -1 &&
                  repetidos.indexOf(value.toLowerCase().trim()) == -1
                ) {
                  repetidos.push(value.toLowerCase().trim());
                }
                repetidos.length > 0 &&
                  dataError.add(
                    `ERROR en la columna ${schema[schemaIndex].name},  ${
                      schema[schemaIndex].message
                        ? schema[schemaIndex].message
                        : 'La columna tiene valores duplicados.'
                    }  `
                  );
              }
            );
          }
          if (schema[schemaIndex]?.required) {
            objFile[schema[schemaIndex].name].forEach(
              (value: string, index: number) => {
                value.toString().trim().length === 0 &&
                  dataError.add(
                    `ERROR en la columna ${schema[schemaIndex].name}, LINEA ${
                      index + 1
                    }, ${
                      schema[schemaIndex].message
                        ? schema[schemaIndex].message
                        : 'El campo es requerido.'
                    }`
                  );
              }
            );
          }
          if (schema[schemaIndex]?.length) {
            objFile[schema[schemaIndex].name].forEach(
              (value: string, index: number) => {
                value.toString().trim().length !==
                  schema[schemaIndex]?.length &&
                  dataError.add(
                    `ERROR en la columna ${schema[schemaIndex].name}, LINEA ${
                      index + 1
                    }, ${
                      schema[schemaIndex].message
                        ? schema[schemaIndex].message
                        : 'El campo debe de tener el numero de caracteres indicado.'
                    }(${schema[schemaIndex]?.length}).`
                  );
              }
            );
          }
          if (schema[schemaIndex]?.include) {
            objFile[schema[schemaIndex].name].forEach(
              (value: string, index: number) => {
                !schema[schemaIndex]?.include!.includes(value) &&
                  dataError.add(
                    `ERROR en la columna ${schema[schemaIndex].name}, LINEA ${
                      index + 1
                    }, ${
                      schema[schemaIndex].message
                        ? schema[schemaIndex].message
                        : 'El Campo solo puede incluir los siguientes valores.'
                    } (${schema[schemaIndex]?.include}).`
                  );
              }
            );
          }
          if (schema[schemaIndex]?.reg) {
            objFile[schema[schemaIndex].name].forEach(
              (value: string, index: number) => {
                !schema[schemaIndex]?.reg.test(value) &&
                  dataError.add(
                    `ERROR en la columna ${schema[schemaIndex].name}, LINEA ${
                      index + 1
                    }, ${
                      schema[schemaIndex].message
                        ? schema[schemaIndex].message
                        : 'El Campo no cumple los criterios de la expresión regular .'
                    } (${schema[schemaIndex]?.reg}).`
                  );
              }
            );
          }
          if (schema[schemaIndex]?.refIsGreaterDate) {
            objFile[schema[schemaIndex].name].forEach(
              (valueFechaFin: string, indexFechaFin: number) => {
                objFile[schema[schemaIndex]?.refIsGreaterDate!].forEach(
                  (valueFechaInicio: string, indexFechaInicio: number) => {
                    if (indexFechaFin === indexFechaInicio) {
                      new Date(valueFechaInicio) > new Date(valueFechaFin) &&
                        dataError.add(
                          `ERROR en la columna ${
                            schema[schemaIndex]?.refIsGreaterDate
                          }, LINEA ${indexFechaInicio + 1}, ${
                            schema[schemaIndex].message
                              ? schema[schemaIndex].message
                              : 'La fecha de inicio no puede ser mayor a la fecha fin.'
                          }`
                        );
                    }
                  }
                );
              }
            );
          }
        }
        errorsFile = Array.from(new Set(dataError));
        resolve({
          errorsFile,
          dataFile,
          infoFile,
        });
      } catch (error) {
        reject('Ha Ocurrido un error...');
      }
    };
  });
};
