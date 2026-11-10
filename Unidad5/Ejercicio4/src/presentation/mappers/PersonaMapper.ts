import { injectable } from 'inversify';
import { Persona } from '../../domain/entities/Persona';
import { PersonaConColor } from '../models/DTO/PersonaConColor';

@injectable()
export class PersonaMapper {
  toPersonaConColor(persona: Persona, posicion: number): PersonaConColor {
    return PersonaConColor.desdePersona(persona, posicion);
  }
}