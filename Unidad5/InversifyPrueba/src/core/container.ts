import 'reflect-metadata';
import { Container } from 'inversify';
import { PersonasUseCases } from '../Domain/UseCases/PersonasUseCases';
import { IUseCasesPersonas } from '../Domain/Interfaces/UseCases/IUseCasesPersonas';
import {
  RepositoryPersona,
  RepositoryPersona100,
  RepositoryPersonaVacio,
} from '../Models/Data/RepositoryPersona';
import { IRepositoryPersona } from '../Domain/Interfaces/Repositories/IRepositoryPersona';
import { PersonaViewModel } from '../ViewModels/PersonaViewModel';
import { TYPES } from './types';

const container = new Container();

// Cambia esta clase por RepositoryPersonaVacio o RepositoryPersona100 para probar.
const repositoryImplementation = RepositoryPersona;

container.bind<IRepositoryPersona>(TYPES.IRepositoryPersona).to(repositoryImplementation);
container.bind<IUseCasesPersonas>(TYPES.IUseCasesPersonas).to(PersonasUseCases);
container.bind<PersonaViewModel>(TYPES.PersonaViewModel).to(PersonaViewModel);

export { container };