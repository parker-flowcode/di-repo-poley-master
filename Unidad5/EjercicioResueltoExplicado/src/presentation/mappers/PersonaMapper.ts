import { injectable } from 'inversify';
import { PersonaConDepartamentoDTO } from '../../domain/DTO/PersonaConDepartamentoDTO';
import { PersonaUIModel } from '../models/PersonaUIModel';

@injectable()
export class PersonaMapper {
  toUIModel(persona: PersonaConDepartamentoDTO): PersonaUIModel {
    return new PersonaUIModel(
      persona.id,
      `${persona.nombre} ${persona.apellidos}`,
      persona.departamentoNombre,
      persona.departamentoColor,
    );
  }
}