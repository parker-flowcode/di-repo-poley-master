import { inject, injectable } from 'inversify';
import { Persona } from '../Models/Entities/Persona';
import { IUseCasesPersonas } from '../Domain/Interfaces/UseCases/IUseCasesPersonas';
import { TYPES } from '../core/types';

@injectable()
export class PersonaViewModel {
  private _personas: Persona[] = [];
  private _isLoading = true;
  private _error = '';

  constructor(
    @inject(TYPES.IUseCasesPersonas)
    private readonly useCases: IUseCasesPersonas,
  ) {
    this.cargarPersonas();
  }

  get personas(): Persona[] {
    return this._personas;
  }

  get isLoading(): boolean {
    return this._isLoading;
  }

  get error(): string {
    return this._error;
  }

  get diaEsPar(): boolean {
    return new Date().getDate() % 2 === 0;
  }

  private cargarPersonas(): void {
    this._isLoading = true;
    this._error = '';
    try {
      this._personas = this.useCases.mostrarPersonasPorDias();
    } catch {
      this._error = 'No se pudo cargar el listado de personas.';
    } finally {
      this._isLoading = false;
    }
  }
}