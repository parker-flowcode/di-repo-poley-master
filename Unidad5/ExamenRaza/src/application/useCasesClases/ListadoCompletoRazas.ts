import { inject, injectable } from 'inversify';
import { Raza } from '../../domain/entities/Raza';
import { IRazaRepository } from '../../domain/interfaces/repositories/IRazaRepository';
import { IListadoCompletoRazas } from '../iUseCases/IListadoCompletoRazas';
import { TYPES } from '../../core/types';

@injectable()
export class ListadoCompletoRazas implements IListadoCompletoRazas {
  constructor(
    @inject(TYPES.IRazaRepository)
    private readonly razaRepository: IRazaRepository,
  ) {}

  execute(): Raza[] {
    return this.razaRepository.getListadosRazas();
  }
}