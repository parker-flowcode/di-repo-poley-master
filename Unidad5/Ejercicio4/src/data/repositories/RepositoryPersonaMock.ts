import { injectable } from 'inversify';
import { Persona } from '../../domain/entities/Persona';
import { IRepositoryPersona } from '../../domain/interfaces/repositories/IRepositoryPersona';

@injectable()
export class RepositoryPersonaMock implements IRepositoryPersona {
  getPersonas(): Persona[] {
    return [
      new Persona('P-001', 'Clara', 'Montes', new Date(1992, 4, 18)),
      new Persona('P-002', 'Mateo', 'Rivas', new Date(1988, 9, 7)),
      new Persona('P-003', 'Inés', 'Navarro', new Date(1996, 1, 25)),
      new Persona('P-004', 'Leo', 'Serrano', new Date(1990, 7, 11)),
      new Persona('P-005', 'Vega', 'Campos', new Date(1994, 3, 2)),
      new Persona('P-006', 'Nora', 'Fuentes', new Date(1986, 11, 16)),
      new Persona('P-007', 'Adrián', 'Vidal', new Date(1998, 5, 30)),
    ];
  }
}