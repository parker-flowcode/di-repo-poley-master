import { inject, injectable } from 'inversify';
import { Persona } from '../../domain/entities/Persona';
import { IRepositoryPersona } from '../../domain/interfaces/repositories/IRepositoryPersona';
import { IUseCasesPersonas } from '../../domain/interfaces/useCase/IUseCasesPersonas';
import { TYPES } from '../../core/types';

@injectable()
export class PersonasUseCases implements IUseCasesPersonas {
  constructor(
    @inject(TYPES.IRepositoryPersona)
    private readonly repository: IRepositoryPersona,
  ) {}

  getPersonas(): Persona[] {
    return this.repository.getPersonas();
  }

  obtenerPersonaDelDia(): Persona {
    const personas = this.getPersonas();
    if (personas.length < 7) {
      throw new Error('El repositorio debe contener las siete personas de la semana.');
    }

    return personas[new Date().getDay()];
  }
}