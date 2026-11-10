import { Persona } from '../../../domain/entities/Persona';

const colorsByPosition = [
  '#FF735E',
  '#68A8FF',
  '#FFC857',
  '#C38BFF',
  '#42D6C1',
  '#FF78B7',
  '#B4E66A',
];

export class PersonaConColor {
  private _color: string;

  constructor(
    private readonly _id: string,
    private _nombre: string,
    private _apellidos: string,
    private _fechaNacimiento: Date,
    posicion: number,
  ) {
    this._color = this.asignarColor(posicion);
  }

  static desdePersona(persona: Persona, posicion: number): PersonaConColor {
    return new PersonaConColor(
      persona.id,
      persona.nombre,
      persona.apellidos,
      persona.fechaNacimiento,
      posicion,
    );
  }

  get id(): string {
    return this._id;
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

  get color(): string {
    return this._color;
  }

  get nombreCompleto(): string {
    return `${this._nombre} ${this._apellidos}`;
  }

  private asignarColor(posicion: number): string {
    const color = colorsByPosition[posicion];
    if (!color) {
      throw new RangeError(`No hay un color definido para la posición ${posicion}.`);
    }
    return color;
  }
}