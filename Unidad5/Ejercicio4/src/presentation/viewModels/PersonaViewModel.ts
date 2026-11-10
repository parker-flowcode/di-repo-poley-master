import { inject, injectable } from 'inversify';
import { Persona } from '../../domain/entities/Persona';
import { IUseCasesPersonas } from '../../domain/interfaces/useCase/IUseCasesPersonas';
import { TYPES } from '../../core/types';
import { PersonaConColor } from '../models/DTO/PersonaConColor';
import { PersonaMapper } from '../mappers/PersonaMapper';

@injectable()
export class PersonaViewModel {
  private _personaActual: PersonaConColor | null = null;
  private _isLoading = false;
  private _error = '';

  constructor(
    @inject(TYPES.IUseCasesPersonas)
    private readonly useCases: IUseCasesPersonas,
    @inject(TYPES.PersonaMapper)
    private readonly personaMapper: PersonaMapper,
  ) {}

  get personaActual(): PersonaConColor | null {
    return this._personaActual;
  }

  get isLoading(): boolean {
    return this._isLoading;
  }

  get error(): string {
    return this._error;
  }

  cargarPersona(posicion?: number): void {
    this._isLoading = true;
    this._error = '';
    try {
      const posicionSeleccionada = posicion ?? new Date().getDay();
      const personaDelDia: Persona | undefined = posicion === undefined
        ? this.useCases.obtenerPersonaDelDia()
        : this.useCases.getPersonas()[posicionSeleccionada];
      if (!personaDelDia) {
        throw new RangeError(`No existe una persona en la posición ${posicionSeleccionada}.`);
      }
      this._personaActual = this.personaMapper.toPersonaConColor(
        personaDelDia,
        posicionSeleccionada,
      );
    } catch {
      this._error = 'No se pudo cargar la persona de hoy.';
    } finally {
      this._isLoading = false;
    }
  }
}