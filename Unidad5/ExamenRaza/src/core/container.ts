import 'reflect-metadata';
import { Container } from 'inversify';
import { ActualizarAnimal } from '../application/useCases/ActualizarAnimal';
import { ListadoAnimalesFecha } from '../application/useCases/ListadoAnimalesFecha';
import { ListadoCompletoRazas } from '../application/useCases/ListadoCompletoRazas';
import { AnimalRepository } from '../data/repositories/AnimalRepository';
import { RazaRepository } from '../data/repositories/RazaRepository';
import { AnimalesViewModel } from '../presentation/viewModels/AnimalesViewModel';
import { TYPES } from './types';

const container = new Container();

// Los casos de uso comparten repositorios para que las escrituras se reflejen al volver a consultar.
container.bind(TYPES.IAnimalRepository).to(AnimalRepository).inSingletonScope();
container.bind(TYPES.IRazaRepository).to(RazaRepository).inSingletonScope();
container.bind(TYPES.IListadoAnimalesFecha).to(ListadoAnimalesFecha);
container.bind(TYPES.IActualizarAnimal).to(ActualizarAnimal);
container.bind(TYPES.IListadoCompletoRazas).to(ListadoCompletoRazas);
container.bind(TYPES.AnimalesViewModel).to(AnimalesViewModel);

export { container };