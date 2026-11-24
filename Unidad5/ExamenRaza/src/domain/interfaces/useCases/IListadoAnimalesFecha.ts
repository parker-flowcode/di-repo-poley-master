import { Animal } from '../../entities/Animal';

export interface IListadoAnimalesFecha {
  execute(fecha: Date): Animal[];
}