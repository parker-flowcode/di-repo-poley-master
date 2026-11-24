import { inject, injectable } from 'inversify';
import { Animal } from '../../domain/entities/Animal';
import { Raza } from '../../domain/entities/Raza';
import { IActualizarAnimal } from '../../domain/interfaces/useCases/IActualizarAnimal';
import { IListadoAnimalesFecha } from '../../domain/interfaces/useCases/IListadoAnimalesFecha';
import { IListadoCompletoRazas } from '../../domain/interfaces/useCases/IListadoCompletoRazas';
import { TYPES } from '../../core/types';
import { AnimalConColor } from '../models/AnimalConColor';

@injectable()
export class AnimalesViewModel {
  private readonly _fecha = new Date();
  private _listadoAnimalConColor: AnimalConColor[] = [];
  private _mensaje = 'Selecciona una raza para cada animal que quieras clasificar.';
  private _numActualizaciones = 0;
  private readonly _razas: Raza[];

  constructor(
    @inject(TYPES.IListadoAnimalesFecha)
    private readonly listadoUseCase: IListadoAnimalesFecha,
    @inject(TYPES.IActualizarAnimal)
    private readonly actualizarUseCase: IActualizarAnimal,
    @inject(TYPES.IListadoCompletoRazas)
    private readonly razasUseCase: IListadoCompletoRazas,
  ) {
    this._razas = this.razasUseCase.execute();
    this.recargarAnimales();
  }

  get fecha(): Date {
    return this._fecha;
  }

  get listadoAnimalConColor(): AnimalConColor[] {
    return this._listadoAnimalConColor;
  }

  get razas(): Raza[] {
    return this._razas;
  }

  get mensaje(): string {
    return this._mensaje;
  }

  get numActualizaciones(): number {
    return this._numActualizaciones;
  }

  seleccionarRaza(idAnimal: number, idRaza: number): void {
    const animal = this._listadoAnimalConColor.find((item) => item.idAnimal === idAnimal);
    if (animal) {
      animal.idRazaSeleccionada = idRaza;
    }
  }

  actualizarRazas(): void {
    let actualizados = 0;

    for (const animal of this._listadoAnimalConColor) {
      if (animal.idRazaSeleccionada !== null
        && this.actualizarUseCase.execute(animal.idAnimal, animal.idRazaSeleccionada)) {
        actualizados += 1;
      }
    }

    this._numActualizaciones = actualizados;
    this._mensaje = actualizados === 1
      ? 'Se ha actualizado 1 registro.'
      : `Se han actualizado ${actualizados} registros.`;

    // Al recargar, las filas guardadas desaparecen porque ya tienen una raza asignada.
    this.recargarAnimales();
  }

  private recargarAnimales(): void {
    this._listadoAnimalConColor = this.listadoUseCase.execute(this._fecha)
      .map((animal: Animal) => new AnimalConColor(
        animal.id,
        animal.nombre,
        animal.sexo,
      ));
  }
}