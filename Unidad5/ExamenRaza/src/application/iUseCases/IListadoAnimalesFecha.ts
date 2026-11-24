import { Animal } from '../../domain/entities/Animal';

export interface IListadoAnimalesFecha {
  execute(fecha: Date): Animal[];
}