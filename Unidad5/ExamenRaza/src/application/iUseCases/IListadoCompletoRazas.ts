import { Raza } from '../../domain/entities/Raza';

export interface IListadoCompletoRazas {
  execute(): Raza[];
}