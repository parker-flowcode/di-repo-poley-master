import { PersonaConDepartamentoDTO } from '../../domain/DTO/PersonaConDepartamentoDTO';
import { PersonaUIModel } from '../models/PersonaUIModel';

export interface IDomainToUIMapper {
  toUIModel(persona: PersonaConDepartamentoDTO): PersonaUIModel;
}