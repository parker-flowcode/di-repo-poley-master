import { Persona } from '../../../Models/Entities/Persona';

export interface IUseCasesPersonas {
  getPersonas(): Persona[];
  mostrarPersonasPorDias(): Persona[];
  mostrarHombresDiasPares(): Persona[];
  mostrarMujeresDiasImpares(): Persona[];
}