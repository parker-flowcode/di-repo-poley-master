import { inject, injectable } from 'inversify';
import { Persona } from '../../Models/Entities/Persona';
import { IRepositoryPersona } from '../Interfaces/Repositories/IRepositoryPersona';
import { TYPES } from '../../core/types';
import { IUseCasesPersonas } from '../Interfaces/UseCases/IUseCasesPersonas';

@injectable()
export class PersonasUseCases implements IUseCasesPersonas {
  constructor(
    @inject(TYPES.IRepositoryPersona)
    private readonly repository: IRepositoryPersona,
  ) {}

  getPersonas(): Persona[] {
    return this.repository.getPersonas();
  }

  mostrarPersonasPorDias(): Persona[] {
    const diaDelMes = new Date().getDate();
    return diaDelMes % 2 === 0
      ? this.mostrarHombresDiasPares()
      : this.mostrarMujeresDiasImpares();
  }

  mostrarHombresDiasPares(): Persona[] {
    return this.getPersonas().filter((persona) => persona.genero === 'Hombre');
  }

  mostrarMujeresDiasImpares(): Persona[] {
    return this.getPersonas().filter((persona) => persona.genero === 'Mujer');
  }
}