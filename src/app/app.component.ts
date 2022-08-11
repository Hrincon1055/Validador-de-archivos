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
        name: 'nombre_usuario',
        required: true,
        // isText: true,
        regex: {
          reg: /^[^$%&|<>#]*$/,
          message: 'El campo no puede contener caracteres especiales.',
        },
      },
      {
        name: 'numero_documento',
        required: true,
        unique: true,
        minLength: 8,
      },
      {
        name: 'tipo_documento',
        required: true,
        include: ['CC', 'CI', 'TI'],
      },
      {
        name: 'email',
        required: true,
        unique: true,
        isEmail: true,
      },
      {
        name: 'fecha_inicio',
        required: true,
        dateFormatReg: /(0[1-9]|[12][0-9]|3[01])(0[1-9]|1[012])(19|20)\d\d/,
      },
      {
        name: 'fecha_fin',
        refIsGreaterDate: 'fecha_inicio',
        message: 'Mensaje personalizado fechaFin',
      },
      {
        name: 'tipo_Pago',
        required: true,
        include: ['1', '2', '3'],
      },
      {
        name: 'valor_poliza',
        isNumber: true,
      },
      {
        name: 'prueba',
        required: true,
        include: ['x', 'y', 'z'],
        conditionalData: {
          refName: 'tipo_Pago',
          objValidator: { '1': 'x', '2': 'y', '3': 'z' },
        },
      },
    ]);
    validateFile(myfileSchema.getFileModelSchema, fileUpload)
      .then((response) => {
        console.log('app.component LINE 61 =>', response.fileErrors);
      })
      .catch((err) => {
        console.log('app.component LINE 63 =>', err);
      });
  }
}
