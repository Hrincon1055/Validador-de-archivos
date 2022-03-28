import { SchemaFile } from './schemaFile';

export const myfileSchema = new SchemaFile([
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
    maxLength: 5,
  },
  {
    name: 'col4',
    required: true,
  },
  {
    name: 'col5',
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
