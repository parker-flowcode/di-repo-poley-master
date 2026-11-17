import 'reflect-metadata';
import { Container } from 'inversify';
import { GetPersonsWithDepartments } from '../application/useCases/GetPersonsWithDepartments';
import { RepositoryDepartamentoMock } from '../data/repositories/RepositoryDepartamentoMock';
import { RepositoryPersonaMock } from '../data/repositories/RepositoryPersonaMock';
import { IRepositoryDepartamento } from '../domain/interfaces/repositories/IRepositoryDepartamento';
import { IRepositoryPersona } from '../domain/interfaces/repositories/IRepositoryPersona';
import { IGetPersonsWithDepartments } from '../domain/interfaces/useCases/IGetPersonsWithDepartments';
import { PersonaMapper } from '../presentation/mappers/PersonaMapper';
import { PersonListViewModel } from '../presentation/viewModels/PersonListViewModel';
import { TYPES } from './types';

const container = new Container();

container.bind<IRepositoryPersona>(TYPES.IRepositoryPersona).to(RepositoryPersonaMock);
container.bind<IRepositoryDepartamento>(TYPES.IRepositoryDepartamento).to(RepositoryDepartamentoMock);
container.bind<IGetPersonsWithDepartments>(TYPES.IGetPersonsWithDepartments).to(GetPersonsWithDepartments);
container.bind<PersonaMapper>(TYPES.PersonaMapper).to(PersonaMapper);
container.bind<PersonListViewModel>(TYPES.PersonListViewModel).to(PersonListViewModel);

export { container };