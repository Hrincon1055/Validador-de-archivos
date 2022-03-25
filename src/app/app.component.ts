import { Component } from '@angular/core';
import { SchemaFile } from 'src/models/schemaFile';
import { validateFile } from 'src/models/validateFile';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'fileiplod';
  public recordsArray!: string[];
  public errors: string[] = [];

  subirImg(fileUpload: any): void {
    // const file: File = fileUpload.target.files[0];
    const myfileSchema = new SchemaFile([
      {
        name: 'col1',
        required: true,
        // length: 9,
        unique: true,
      },
      {
        name: 'col2',
        length: 9,
        required: true,
        reg: /^\d+$/,
        unique: true,
      },
      {
        name: 'col3',
        required: true,
        include: ['rojo', 'verde'],
      },
      {
        name: 'col4',
        required: true,
      },
      {
        name: 'col5',
        required: true,
        unique: true,
      },
      {
        name: 'fechaInicio',
        required: true,
      },
      {
        name: 'fechaFin',
        refIsGreaterDate: 'fechaInicio',
        message: 'Mensaje personalizado fechaFin',
      },
    ]);
    validateFile(myfileSchema.getFileModelSchema, fileUpload)
      .then((response) => {
        console.log('app.component LINE 61 =>', response);
      })
      .catch((err) => {
        console.log('app.component LINE 63 =>', err);
      });
  }
}

// validateFile(myfileSchema.getFileModelSchema, this.recordsArray)
//   .then((response) => {
//     console.log('app.component LINE 61 =>', response);
//   })
//   .catch((err) => {
//     console.log('app.component LINE 63 =>', err);
//   });
