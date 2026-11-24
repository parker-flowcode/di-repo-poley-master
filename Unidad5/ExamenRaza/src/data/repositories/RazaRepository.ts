import { injectable } from 'inversify';
import { Raza } from '../../domain/entities/Raza';
import { IRazaRepository } from '../../domain/interfaces/repositories/IRazaRepository';

@injectable()
export class RazaRepository implements IRazaRepository {
  private readonly razas = [
    new Raza(1, 'Pura Raza Española'),
    new Raza(2, 'Árabe'),
    new Raza(3, 'Anglo-árabe'),
    new Raza(4, 'Hispano-árabe'),
  ];

  getListadosRazas(): Raza[] {
    return this.razas;
  }
}