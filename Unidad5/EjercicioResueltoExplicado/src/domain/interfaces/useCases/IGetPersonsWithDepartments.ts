import { PersonaConDepartamentoDTO } from '../../DTO/PersonaConDepartamentoDTO';

export interface IGetPersonsWithDepartments {
  execute(): Promise<PersonaConDepartamentoDTO[]>;
}