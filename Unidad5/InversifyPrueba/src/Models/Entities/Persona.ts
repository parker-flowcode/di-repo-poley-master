export type GeneroPersona = 'Hombre' | 'Mujer';

export class Persona {
  constructor(
    private readonly _dni: string,
    private _nombre: string,
    private _apellidos: string,
    private _fechaNacimiento: Date,
    private readonly _genero: GeneroPersona,
  ) {}

  get dni(): string {
    return this._dni;
  }

  get nombre(): string {
    return this._nombre;
  }

  set nombre(value: string) {
    this._nombre = value;
  }

  get apellidos(): string {
    return this._apellidos;
  }

  set apellidos(value: string) {
    this._apellidos = value;
  }

  get fechaNacimiento(): Date {
    return this._fechaNacimiento;
  }

  set fechaNacimiento(value: Date) {
    this._fechaNacimiento = value;
  }

  get genero(): string {
    return this._genero;
  }

  get nombreCompleto(): string {
    return `${this._nombre} ${this._apellidos}`;
  }
}