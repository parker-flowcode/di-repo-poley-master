import { Raza } from '../../entities/Raza';

export interface IRazaRepository {
  getListadosRazas(): Raza[];
}