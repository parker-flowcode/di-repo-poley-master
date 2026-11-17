import { injectable } from 'inversify';
import { Departamento } from '../../domain/entities/Departamento';
import { IRepositoryDepartamento } from '../../domain/interfaces/repositories/IRepositoryDepartamento';

@injectable()
export class RepositoryDepartamentoMock implements IRepositoryDepartamento {
  async getDepartamentos(): Promise<Departamento[]> {
    return [
      new Departamento(1, 'Administración'),
      new Departamento(2, 'Informática'),
      new Departamento(3, 'Recursos Humanos'),
    ];
  }
}