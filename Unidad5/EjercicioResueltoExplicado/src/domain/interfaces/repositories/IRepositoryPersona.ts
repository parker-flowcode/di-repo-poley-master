import { PersonaConDepartamentoDTO } from '../../DTO/PersonaConDepartamentoDTO';

export interface IRepositoryPersona {
  getPersonasConNombreDepartamento(): Promise<PersonaConDepartamentoDTO[]>;
}