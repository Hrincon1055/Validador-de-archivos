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
        nameColumn: 'col1',
        required: true,
        length: 9,
        unique: true,
      },
      {
        nameColumn: 'col2',
        length: 9,
        required: true,
        unique: true,
        reg: /^\d+$/,
      },
      {
        nameColumn: 'col3',
        required: true,
        includeString: ['rojo', 'verde'],
      },
      {
        nameColumn: 'col4',
        required: true,
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
    let tempColumnData: string[] = [];

    if (dataFile[0].split(';').length !== schema.length) {
      console.warn('Error: El squema no concuerda con los datos del archivo.');
      return;
    }
    dataFile.forEach((dataFileRow: any, dataFileRowIndex: number) => {
      let arrRowTemp = dataFileRow.split(';');
      arrRowTemp.forEach((rowItem: any, rowItemIndex: number) => {
        for (let schemaIndex = 0; schemaIndex < schema.length; schemaIndex++) {
          if (schemaIndex === rowItemIndex) {
            // Valida si el campo es requerido
            if (schema[rowItemIndex]?.required) {
              rowItem.length === 0 &&
                this.errors.push(
                  `Error en la columna ${
                    schema[rowItemIndex].nameColumn
                  } linea ${dataFileRowIndex + 1}, el campom es requrido.`
                );
            }
            // Valida la logitud minima de caracteres que debe tener el campo
            if (schema[rowItemIndex]?.length) {
              rowItem.toString().length !== schema[rowItemIndex].length &&
                this.errors.push(
                  `Error en la columna ${
                    schema[rowItemIndex].nameColumn
                  } linea ${dataFileRowIndex + 1}, el campom tiene que tener ${
                    schema[rowItemIndex].length
                  } digitos.`
                );
            }
            // Valida que el tipo de datos corresponda a lo indicado en el eschema
            if (schema[rowItemIndex]?.reg) {
              !schema[rowItemIndex]?.reg.test(rowItem) &&
                this.errors.push(
                  `Error en la columna ${
                    schema[rowItemIndex].nameColumn
                  } linea ${
                    dataFileRowIndex + 1
                  }, el campo no coincide con el patron de la exprecion regular ${
                    schema[rowItemIndex].reg
                  }.`
                );
            }
            // Valida que solo se incluya valores envidos en el array de string
            if (schema[rowItemIndex]?.includeString) {
              !schema[rowItemIndex]?.includeString.includes(rowItem) &&
                this.errors.push(
                  `Error en la columna ${
                    schema[rowItemIndex].nameColumn
                  } linea ${
                    dataFileRowIndex + 1
                  }, el campo no incluyen los sigientes valores ${
                    schema[rowItemIndex]?.includeString
                  }.`
                );
            }
            // Valida que la columna solo contenga datos no repetidos
            if (schema[rowItemIndex]?.unique) {
              tempColumnData.push(rowItem);
              // console.log('app.component LINE 109 =>', tempColumnData);
              let repetidos: string[] = [];
              let temporal: string[] = [];
              tempColumnData.forEach((value, index) => {
                temporal = Object.assign([], tempColumnData);
                temporal.splice(index, 1);
                if (
                  temporal.indexOf(value) != -1 &&
                  repetidos.indexOf(value) == -1
                )
                  repetidos.push(value);
              });
              repetidos.length > 0 &&
                this.errors.push(
                  `Error en la columna ${schema[rowItemIndex].nameColumn}, La columna tiene valores duplicados.`
                );
            }
          }
        }
      });
    }); // end

    console.log('app.component LINE 87 =>', this.errors);
  }
}
