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

  public cargaMasiva: any[] = [
    {
      pagador: {
        nombre: 'Henry Rincon',
        documentoId: '123456789',
        ciudad: 'Bogota',
      },
      beneficiarios: [
        { nombre: 'B1', documentoId: 'ID1' },
        { nombre: 'B2', documentoId: 'ID2' },
      ],
      conyugue: {},
    },
    {
      pagador: {
        nombre: 'Henry Rincon',
        documentoId: '123456789',
        ciudad: 'Bogota',
      },
      beneficiarios: [
        { nombre: 'B1', documentoId: 'ID1' },
        { nombre: 'B2', documentoId: 'ID2' },
      ],
      conyugue: {},
    },
    {
      pagador: {
        nombre: 'Henry Rincon',
        documentoId: '123456789',
        ciudad: 'Bogota',
      },
      beneficiarios: [
        { nombre: 'B1', documentoId: 'ID1' },
        { nombre: 'B2', documentoId: 'ID2' },
      ],
      conyugue: {},
    },
  ];

  subirImg(fileUpload: any): void {
    // const file: File = fileUpload.target.files[0];}
    const myfileSchema = new SchemaFile([
      {
        name: 'nombre_usuario',
        required: true,
        // isText: true,
        regex: {
          reg: /^[^$%&|<>#]*$/,
          message: 'El campo no puede contener caracteres especiales.',
        },
        group: { nameGroup: 'pagador', type: 'object' },
      },
      {
        name: 'numero_documento',
        required: true,
        unique: true,
        // minLength: 8,
        conditionalLength: {
          refName: 'tipo_documento',
          objValidator: { CC: 9, CI: 8, TI: 8 },
        },
        group: { nameGroup: 'pagador', type: 'object' },
      },
      {
        name: 'tipo_documento',
        required: true,
        include: ['CC', 'CI', 'TI'],
        group: { nameGroup: 'pagador', type: 'object' },
      },
      {
        name: 'email',
        required: true,
        unique: true,
        isEmail: true,
        group: { nameGroup: 'pagador', type: 'object' },
      },
      {
        name: 'fecha_inicio',
        required: true,
        dateValidations: {
          dateFormatReg: /(0[1-9]|[12][0-9]|3[01])(0[1-9]|1[012])(19|20)\d\d/,
          dateFormatString: 'YYYY-MM-DD',
        },
        group: { nameGroup: 'pagador', type: 'object' },
      },
      {
        name: 'fecha_fin',
        dateValidations: {
          refIsGreaterDateNane: 'fecha_inicio',
          dateFormatReg: /(0[1-9]|[12][0-9]|3[01])(0[1-9]|1[012])(19|20)\d\d/,
          dateFormatString: 'DD MM YYYY',
        },
        group: { nameGroup: 'pagador', type: 'object' },
      },
      {
        name: 'tipo_pago_id',
        required: true,
        include: ['1', '2', '3'],
        group: { nameGroup: 'pagador', type: 'object' },
      },
      {
        name: 'valor_poliza',
        isNumber: true,
        group: { nameGroup: 'pagador', type: 'object' },
      },
      {
        name: 'tipo_pago_detalle',
        required: true,
        include: ['x', 'y', 'z'],
        conditionalData: {
          refName: 'tipo_pago_id',
          objValidator: { '1': 'x', '2': 'y', '3': 'z' },
        },
        group: { nameGroup: 'pagador', type: 'object' },
      },
      {
        name: 'veneficiario_nombre_1',
        group: { nameGroup: 'beneficiarios', type: 'array', index: 0 },
      },
      {
        name: 'veneficiario_identificacion_1',
        group: { nameGroup: 'beneficiarios', type: 'array', index: 0 },
      },
      {
        name: 'veneficiario_nombre_2',
        group: { nameGroup: 'beneficiarios', type: 'array', index: 1 },
      },
      {
        name: 'veneficiario_identificacion_2',
        group: { nameGroup: 'beneficiarios', type: 'array', index: 1 },
      },
      {
        name: 'veneficiario_nombre_3',
        group: { nameGroup: 'beneficiarios', type: 'array', index: 2 },
      },
      {
        name: 'veneficiario_identificacion_3',
        group: { nameGroup: 'beneficiarios', type: 'array', index: 2 },
      },
      {
        name: 'frcha_compra',
        dateValidations: {
          minorToday: true,
          dateFormatReg: /(0[1-9]|[12][0-9]|3[01])(0[1-9]|1[012])(19|20)\d\d/,
          dateFormatString: 'DD MM YYYY',
        },
        group: { nameGroup: 'pagador', type: 'object' },
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
