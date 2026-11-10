import { Persona } from '../../entities/Persona';

export interface IRepositoryPersona {
  getPersonas(): Persona[];
}