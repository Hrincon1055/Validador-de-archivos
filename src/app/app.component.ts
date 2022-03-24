import { Component } from '@angular/core';
import { SchemaFile } from 'src/models/schemaFile';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'fileiplod';
  public recordsArray!: any;
  public errors: string[] = [];

  subirImg(fileUpload: any): void {
    const file: File = fileUpload.target.files[0];
    const myfileSchema = new SchemaFile([
      {
        name: 'col1',
        index: 0,
        required: true,
        // length: 9,
        unique: true,
      },
      {
        name: 'col2',
        index: 1,
        length: 9,
        required: true,
        reg: /^\d+$/,
        unique: true,
      },
      {
        name: 'col3',
        index: 2,
        required: true,
        include: ['rojo', 'verde'],
      },
      {
        name: 'col4',
        index: 3,
        required: true,
      },
      {
        name: 'col5',
        index: 4,
        required: true,
        unique: true,
      },
      {
        name: 'fechaInicio',
        index: 5,
      },
      {
        name: 'fechaFin',
        index: 6,
        refIsGreaterDate: 'fechaInicio',
      },
    ]);
    if (!file) return;
    const reader = new FileReader();
    reader.readAsText(file);
    reader.onload = () => {
      let data = reader.result;
      this.recordsArray = (<string>data).split(/\r\n|\n/);
      this.validateFile(myfileSchema.getFileModelSchema, this.recordsArray);
    };
  }
  validateFile(schema: any, dataFile: string[]) {
    let dataError = new Set();
    let arrRowTemp: string[] = [];
    let objFile: any = {};
    if (dataFile[0].split(';').length !== schema.length) {
      console.warn('Error: El squema no concuerda con los datos del archivo.');
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
        for (let schemaIndex = 0; schemaIndex < schema.length; schemaIndex++) {
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
          (value: any, index: number) => {
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
                `ERROR en la columna ${schema[schemaIndex].name}, La columna tiene valores duplicados.`
              );
          }
        );
      }
      if (schema[schemaIndex]?.required) {
        objFile[schema[schemaIndex].name].forEach(
          (value: any, index: number) => {
            value.toString().trim().length === 0 &&
              dataError.add(
                `ERROR en la columna ${schema[schemaIndex].name}, LINEA ${
                  index + 1
                } El campo es requerido.`
              );
          }
        );
      }
      if (schema[schemaIndex]?.length) {
        objFile[schema[schemaIndex].name].forEach(
          (value: any, index: number) => {
            value.toString().trim().length !== schema[schemaIndex]?.length &&
              dataError.add(
                `ERROR en la columna ${schema[schemaIndex].name}, LINEA ${
                  index + 1
                } El campo debe de tener el numero de caracteres indicado (${
                  schema[schemaIndex]?.length
                }).`
              );
          }
        );
      }
      if (schema[schemaIndex]?.include) {
        objFile[schema[schemaIndex].name].forEach(
          (value: any, index: number) => {
            !schema[schemaIndex]?.include.includes(value) &&
              dataError.add(
                `ERROR en la columna ${schema[schemaIndex].name}, LINEA ${
                  index + 1
                } El Campo solo puede incluir los siguientes valores (${
                  schema[schemaIndex]?.include
                }).`
              );
          }
        );
      }
      if (schema[schemaIndex]?.reg) {
        objFile[schema[schemaIndex].name].forEach(
          (value: any, index: number) => {
            !schema[schemaIndex]?.reg.test(value) &&
              dataError.add(
                `ERROR en la columna ${schema[schemaIndex].name}, LINEA ${
                  index + 1
                } El Campo no cumple los criterios de la expresión regular (${
                  schema[schemaIndex]?.reg
                }).`
              );
          }
        );
      }
      if (schema[schemaIndex]?.refIsGreaterDate) {
        objFile[schema[schemaIndex].name].forEach(
          (valueFechaFin: any, indexFechaFin: number) => {
            objFile[schema[schemaIndex]?.refIsGreaterDate].forEach(
              (valueFechaInicio: any, indexFechaInicio: number) => {
                if (indexFechaFin === indexFechaInicio) {
                  new Date(valueFechaInicio) > new Date(valueFechaFin) &&
                    dataError.add(
                      `ERROR en la columna ${
                        schema[schemaIndex]?.refIsGreaterDate
                      }, LINEA ${
                        indexFechaInicio + 1
                      }, La fecha de inicio no puede ser mayor a la fecha fin.`
                    );

                  // console.log(
                  //   'app.component LINE 182 =>',
                  //   new Date(valueFechaInicio)
                  //   // new Date(valueFechaFin)
                  // );
                }
              }
            );
          }
        );
      }
    }

    console.log(dataError);
  }
}
//     {
//       name: 'fechaInicio',
//       index: 5,
//     },
//     {
//       name: 'fechaFin',
//       index: 6,
//       refIsGreaterDate: 'fechaInicio',
//     },
