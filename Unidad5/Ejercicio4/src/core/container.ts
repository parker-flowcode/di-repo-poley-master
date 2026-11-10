import 'reflect-metadata';
import { Container } from 'inversify';
import { PersonasUseCases } from '../application/useCaseClases/PersonasUseCases';
import { RepositoryPersonaMock } from '../data/repositories/RepositoryPersonaMock';
import { IRepositoryPersona } from '../domain/interfaces/repositories/IRepositoryPersona';
import { IUseCasesPersonas } from '../domain/interfaces/useCase/IUseCasesPersonas';
import { PersonaViewModel } from '../presentation/viewModels/PersonaViewModel';
import { PersonaMapper } from '../presentation/mappers/PersonaMapper';
import { TYPES } from './types';

const container = new Container();

container.bind<IRepositoryPersona>(TYPES.IRepositoryPersona).to(RepositoryPersonaMock);
container.bind<IUseCasesPersonas>(TYPES.IUseCasesPersonas).to(PersonasUseCases);
container.bind<PersonaViewModel>(TYPES.PersonaViewModel).to(PersonaViewModel);
container.bind<PersonaMapper>(TYPES.PersonaMapper).to(PersonaMapper);

export { container };