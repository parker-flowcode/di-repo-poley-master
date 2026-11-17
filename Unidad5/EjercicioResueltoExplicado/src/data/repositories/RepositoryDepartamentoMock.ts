import { injectable } from 'inversify';
import { Departamento } from '../../domain/entities/Departamento';
import { IRepositoryDepartamento } from '../../domain/interfaces/repositories/IRepositoryDepartamento';

@injectable()
export class RepositoryDepartamentoMock implements IRepositoryDepartamento {
  async getDepartamentos(): Promise<Departamento[]> {
    return [
      new Departamento(1, 'Administración', '#EAF2D7'),
      new Departamento(2, 'Informática', '#DDEBF5'),
      new Departamento(3, 'Recursos Humanos', '#F8E5DC'),
    ];
  }
}