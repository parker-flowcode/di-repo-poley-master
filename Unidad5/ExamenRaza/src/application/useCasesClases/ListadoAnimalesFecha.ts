import { inject, injectable } from 'inversify';
import { Animal } from '../../domain/entities/Animal';
import { IAnimalRepository } from '../../domain/interfaces/repositories/IAnimalRepository';
import { IListadoAnimalesFecha } from '../iUseCases/IListadoAnimalesFecha';
import { TYPES } from '../../core/types';

@injectable()
export class ListadoAnimalesFecha implements IListadoAnimalesFecha {
  constructor(
    @inject(TYPES.IAnimalRepository)
    private readonly animalRepository: IAnimalRepository,
  ) {}

  // El caso de uso oculta los animales ya clasificados para prevenir cambios accidentales.
  execute(fecha: Date): Animal[] {
    return this.animalRepository.getListadoFecha(fecha).filter((animal) => animal.idRaza === 0);
  }
}