import { Raza } from '../../entities/Raza';

export interface IListadoCompletoRazas {
  execute(): Raza[];
}