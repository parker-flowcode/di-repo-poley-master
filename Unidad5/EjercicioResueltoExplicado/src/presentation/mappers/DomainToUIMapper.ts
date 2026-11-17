import { injectable } from 'inversify';
import { PersonaConDepartamentoDTO } from '../../domain/DTO/PersonaConDepartamentoDTO';
import { PersonaUIModel } from '../models/PersonaUIModel';
import { IDomainToUIMapper } from './IDomainToUIMapper';

@injectable()
export class DomainToUIMapper implements IDomainToUIMapper {
  toUIModel(persona: PersonaConDepartamentoDTO): PersonaUIModel {
    return new PersonaUIModel(
      persona.id,
      `${persona.nombre} ${persona.apellidos}`,
      persona.departamentoNombre,
      persona.departamentoColor,
    );
  }
}