import { Persona } from '../../entities/Persona';

export interface IUseCasesPersonas {
  getPersonas(): Persona[];
  obtenerPersonaDelDia(): Persona;
}