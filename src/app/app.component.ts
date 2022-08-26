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
      encabezado: {
        registroControl: 0,
        entidad: 0,
        compannia: 0,
        seccion: 0,
        producto: 0,
        fechaEnvio: '2022-08-25T21:06:10.909Z',
        secuenciaEnvio: 0,
        totalPolizas: 0,
        tipoCargue: 0,
      },
      cargaMasiva: [
        {
          asegurado: {
            numeroRiesgo: 0,
            tipoDocumento: 'string',
            documentoIdentificacion: 0,
            apellidos: 'string',
            nombres: 'string',
            parentesco: 'string',
            genero: 'string',
            provincia: 'string',
            canton: 'string',
            distrito: 'string',
            sennasEspecificas: 'string',
            celular: 'string',
            telefonoCasa: 'string',
            telefonoOficinas: 'string',
            fechaNacimiento: '2022-08-25T21:06:10.909Z',
            edad: 0,
            correo: 'string',
            codigoOcupacionAsegurado: 'string',
          },
          poliza: {
            tipoRegistro: 0,
            transaccion: 0,
            tipoProceso: 0,
            moneda: 0,
            periodicidad: 0,
            producto: 0,
            polizaPrincipal: 'string',
            numeroPoliza: 0,
            fechaInicio: '2022-08-25T21:06:10.909Z',
            fechaVence: '2022-08-25T21:06:10.909Z',
            causaModificacion: 0,
            agente: 'string',
            pluridadSeguros: 'string',
            idUsuario: 'string',
          },
          conyuge: {
            tipoDocumento: 'string',
            documentoIdentificacion: 'string',
            fechaNacimiento: '2022-08-25T21:06:10.909Z',
            nombreCompleto: 'string',
            parentesco: 0,
          },
          beneficiarios: [
            {
              numeroRiesgo: 0,
              consecutivoBeneficiario: 0,
              tipoDocumento: 'string',
              numeroDocumento: 'string',
              apellidos: 'string',
              nombres: 'string',
              porcentajeAsignacion: 0,
              parentescoBeneficiario: 0,
              calidad: 0,
            },
          ],
          productos: {
            ciudadRiesgo: 'string',
            plan: 'string',
            coberturas: 'string',
            sumaAsegurada: 0,
            costoPrima: 0,
            alternativa: 0,
          },
          dependientes: [
            {
              numeroDependiente: 0,
              tipoDocumento: 'string',
              numeroDocumento: 'string',
              fechaNacimiento: '2022-08-25T21:06:10.909Z',
              nombreCompleto: 'string',
              parentesco: 0,
            },
          ],
          debitoAutomaticoCargaMasiva: {
            entidadFinanciera: 0,
            canalDescuento: 0,
            numeroTarjetaCuenta: 0,
            periodo: 0,
            numeroCuotas: 0,
            email: 'string',
            fechaVencimientoTarjeta: 'string',
          },
          documentacionCargaMasiva: {
            observaciones: 'string',
            motivoAnulacion: 'string',
          },
          producto14353: {
            tipoDocumento: 'string',
            documentoIdentificacion: 'string',
            ciudadRiesgo: 'string',
            plan: 'string',
            coberturas: 'string',
            sumaAsegurada: 0,
            costoPrima: 0,
            alternativa: 0,
            numeroCredito: 0,
            fechaInicioCredito: 0,
            fechaFinCredito: 0,
            parentescoProducto: 0,
            ocupacionAsegurado: 0,
            direccion1: 'string',
            direccion2: 'string',
            direccion3: 'string',
            direccion4: 'string',
            direccion5: 'string',
            direccion6: 'string',
            direccion7: 'string',
            numeroFolioReal: 0,
            areaConstruccion: 0,
            anioConstruccion: 0,
            porcentajeDedicadoVivienda: 0,
            valorAseguradoVivienda: 0,
            tipoCredito: 'string',
          },
          producto50001: {
            tipoDocumento: 'string',
            documentoIdentificacion: 'string',
            coberturas: 'string',
            ciudadRiesgo: 'string',
            ocupacionAsegurado: 0,
            tipoCredito: 'string',
            actividadLaboral: 0,
            tipoContrato: 0,
            ocupacion: 'string',
            nombreEmpleador: 'string',
            fechaVinculacion: 'string',
            plan: 'string',
            alternativa: 0,
            cuotaCredito: 'string',
            fechaAperturaCredito: 'string',
            fechaFinCredito: 'string',
            numeroCredito: 0,
          },
          producto71854: {
            tipoDocumento: 'string',
            documentoIdentificacion: 'string',
            coberturas: 'string',
            ciudadRiesgo: 'string',
            ocupacionAsegurado: 0,
            parentesco: 0,
            sumaAsegurada: 0,
            recargoSaludVida: 0,
            recargoSaludItp: 0,
            numeroCredito: 0,
            fechaAperturaCredito: 'string',
            fechaFinCredito: 'string',
            tipoCredito: 'string',
          },
        },
      ],
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
        include: {
          dataInclude: ['CC', 'CI', 'TI'],
          message: 'Debe ser un tipo de identificacion valido',
        },
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
        include: {
          dataInclude: ['1', '2', '3'],
          message: 'Debe ser un tipo pago valido',
        },
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
        include: {
          dataInclude: ['x', 'y', 'z'],
          message: 'Debe ser un detalle pago valido',
        },
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
      {
        name: 'porcentaja',
        sumaPorcentaje: true,
      },
    ]);
    validateFile(myfileSchema.getFileModelSchema, fileUpload, 'S', ';')
      .then((response) => {
        console.log('app.component LINE 61 =>', response);
      })
      .catch((err) => {
        console.log('app.component LINE 63 =>', err);
      });
  }
}
