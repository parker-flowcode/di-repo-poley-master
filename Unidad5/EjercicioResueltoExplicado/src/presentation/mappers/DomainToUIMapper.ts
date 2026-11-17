import { injectable } from 'inversify';
import { PersonaConDepartamentoDTO } from '../../domain/DTO/PersonaConDepartamentoDTO';
import { PersonaUIModel } from '../models/PersonaUIModel';
import { IDomainToUIMapper } from './IDomainToUIMapper';

const departmentColors: Record<number, string> = {
  1: '#EAF2D7',
  2: '#DDEBF5',
  3: '#F8E5DC',
};

@injectable()
export class DomainToUIMapper implements IDomainToUIMapper {
  toUIModel(persona: PersonaConDepartamentoDTO): PersonaUIModel {
    const departmentColor = departmentColors[persona.departamentoId] ?? '#E4E9E4';

    return new PersonaUIModel(
      persona.id,
      `${persona.nombre} ${persona.apellidos}`,
      persona.departamentoNombre,
      departmentColor,
    );
  }
}