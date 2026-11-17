import { injectable } from 'inversify';
import { Persona } from '../../domain/entities/Persona';
import { IRepositoryPersona } from '../../domain/interfaces/repositories/IRepositoryPersona';

@injectable()
export class RepositoryPersonaMock implements IRepositoryPersona {
  async getPersonas(): Promise<Persona[]> {
    return [
      new Persona('P-001', 'Clara', 'Montes', 1),
      new Persona('P-002', 'Mateo', 'Rivas', 2),
      new Persona('P-003', 'Inés', 'Navarro', 3),
      new Persona('P-004', 'Leo', 'Serrano', 2),
      new Persona('P-005', 'Vega', 'Campos', 1),
      new Persona('P-006', 'Nora', 'Fuentes', 3),
      new Persona('P-007', 'Adrián', 'Vidal', 2),
      new Persona('P-008', 'Hugo', 'Molina', 1),
      new Persona('P-009', 'Lara', 'Cano', 3),
      new Persona('P-010', 'Bruno', 'Rey', 2),
    ];
  }
}