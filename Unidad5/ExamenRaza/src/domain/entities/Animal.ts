export type SexoAnimal = 'Macho' | 'Hembra';

export class Animal {
  constructor(
    private readonly _id: number,
    private readonly _nombre: string,
    private _sexo: SexoAnimal,
    private readonly _idRaza: number,
    private readonly _colorCelda: string,
    private _fechaDeEntrega: Date,
  ) {}

  get id(): number {
    return this._id;
  }

  get nombre(): string {
    return this._nombre;
  }

  get sexo(): SexoAnimal {
    return this._sexo;
  }

  set sexo(sexo: SexoAnimal) {
    this._sexo = sexo;
  }

  get idRaza(): number {
    return this._idRaza;
  }

  get colorCelda(): string {
    return this._colorCelda;
  }

  get fechaDeEntrega(): Date {
    return this._fechaDeEntrega;
  }

  set fechaDeEntrega(fecha: Date) {
    this._fechaDeEntrega = fecha;
  }
}