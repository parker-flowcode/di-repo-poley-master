import { inject, injectable } from 'inversify';
import { PersonaConDepartamentoDTO } from '../../domain/DTO/PersonaConDepartamentoDTO';
import { IRepositoryPersona } from '../../domain/interfaces/repositories/IRepositoryPersona';
import { IGetPersonsWithDepartments } from '../../domain/interfaces/useCases/IGetPersonsWithDepartments';
import { TYPES } from '../../core/types';

@injectable()
export class GetPersonsWithDepartments implements IGetPersonsWithDepartments {
  constructor(
    @inject(TYPES.IRepositoryPersona)
    private readonly personasRepository: IRepositoryPersona,
  ) {}

  async execute(): Promise<PersonaConDepartamentoDTO[]> {
    return this.personasRepository.getPersonasConNombreDepartamento();
  }
}