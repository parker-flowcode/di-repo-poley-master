import { Persona } from '../../../Models/Entities/Persona';

export interface IRepositoryPersona {
	getPersonas(): Persona[];
}