import { Animal } from '../../domain/entities/Animal';
import { AnimalConColor } from '../models/AnimalConColor';

export class AnimalConColorMapper {
  toModel(animal: Animal): AnimalConColor {
    return new AnimalConColor(animal.id, animal.nombre, animal.sexo);
  }

  toModels(animales: Animal[]): AnimalConColor[] {
    return animales.map((animal) => this.toModel(animal));
  }
}