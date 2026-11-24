import { Animal } from '../../entities/Animal';

export interface IAnimalRepository {
  getListadoFecha(fecha: Date): Animal[];
  actualizarAnimal(idAnimal: number, idRaza: number): boolean;
}