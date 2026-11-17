import { Departamento } from '../../entities/Departamento';

export interface IRepositoryDepartamento {
  getDepartamentos(): Promise<Departamento[]>;
}