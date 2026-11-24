export class Raza {
  constructor(
    private readonly _idRaza: number,
    private _nombre: string,
  ) {}

  get idRaza(): number {
    return this._idRaza;
  }

  get nombre(): string {
    return this._nombre;
  }

  set nombre(nombre: string) {
    this._nombre = nombre;
  }
}