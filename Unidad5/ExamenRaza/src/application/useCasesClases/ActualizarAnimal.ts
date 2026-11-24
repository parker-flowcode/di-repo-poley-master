import { inject, injectable } from 'inversify';
import { IAnimalRepository } from '../../domain/interfaces/repositories/IAnimalRepository';
import { IActualizarAnimal } from '../iUseCases/IActualizarAnimal';
import { TYPES } from '../../core/types';

@injectable()
export class ActualizarAnimal implements IActualizarAnimal {
  constructor(
    @inject(TYPES.IAnimalRepository)
    private readonly animalRepository: IAnimalRepository,
  ) {}

  execute(idAnimal: number, idRaza: number): boolean {
    return this.animalRepository.actualizarAnimal(idAnimal, idRaza);
  }
}