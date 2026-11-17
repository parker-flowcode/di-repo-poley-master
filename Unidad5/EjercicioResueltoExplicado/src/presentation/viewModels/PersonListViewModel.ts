import { inject, injectable } from 'inversify';
import { IGetPersonsWithDepartments } from '../../domain/interfaces/useCases/IGetPersonsWithDepartments';
import { TYPES } from '../../core/types';
import { PersonaMapper } from '../mappers/PersonaMapper';
import { PersonaUIModel } from '../models/PersonaUIModel';

@injectable()
export class PersonListViewModel {
  private _personas: PersonaUIModel[] = [];
  private _error = '';

  constructor(
    @inject(TYPES.IGetPersonsWithDepartments)
    private readonly getPersonsWithDepartments: IGetPersonsWithDepartments,
    @inject(TYPES.PersonaMapper)
    private readonly personaMapper: PersonaMapper,
  ) {}

  get personas(): PersonaUIModel[] {
    return this._personas;
  }

  get error(): string {
    return this._error;
  }

  async cargarPersonas(): Promise<void> {
    this._error = '';
    try {
      const personas = await this.getPersonsWithDepartments.execute();
      this._personas = personas.map((persona) => this.personaMapper.toUIModel(persona));
    } catch {
      this._personas = [];
      this._error = 'No se pudo cargar el listado de personas.';
    }
  }
}