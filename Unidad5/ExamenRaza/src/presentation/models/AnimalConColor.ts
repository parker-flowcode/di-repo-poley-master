import { SexoAnimal } from '../../domain/entities/Animal';

export class AnimalConColor {
  private _idRazaSeleccionada: number | null = null;
  private readonly _colorFondo: string;

  constructor(
    private readonly _idAnimal: number,
    private readonly _nombreAnimal: string,
    private readonly _sexo: SexoAnimal,
  ) {
    this._colorFondo = this.asignarColor();
  }

  get idAnimal(): number {
    return this._idAnimal;
  }

  get nombreAnimal(): string {
    return this._nombreAnimal;
  }

  get sexo(): SexoAnimal {
    return this._sexo;
  }

  get colorFondo(): string {
    return this._colorFondo;
  }

  get idRazaSeleccionada(): number | null {
    return this._idRazaSeleccionada;
  }

  set idRazaSeleccionada(idRaza: number | null) {
    this._idRazaSeleccionada = idRaza;
  }

  private asignarColor(): string {
    return this._sexo === 'Macho' ? '#ffffff' : '#e8f3ff';
  }
}