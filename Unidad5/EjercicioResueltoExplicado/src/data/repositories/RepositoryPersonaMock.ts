import { inject, injectable } from 'inversify';
import { TYPES } from '../../core/types';
import { PersonaConDepartamentoDTO } from '../../domain/DTO/PersonaConDepartamentoDTO';
import { Persona } from '../../domain/entities/Persona';
import { IRepositoryDepartamento } from '../../domain/interfaces/repositories/IRepositoryDepartamento';
import { IRepositoryPersona } from '../../domain/interfaces/repositories/IRepositoryPersona';

@injectable()
export class RepositoryPersonaMock implements IRepositoryPersona {
  constructor(
    @inject(TYPES.IRepositoryDepartamento)
    private readonly departamentoRepository: IRepositoryDepartamento,
  ) {}

  async getPersonasConNombreDepartamento(): Promise<PersonaConDepartamentoDTO[]> {
    const personas = [
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
    const departamentos = await this.departamentoRepository.getDepartamentos();
    const departamentosPorId = new Map(
      departamentos.map((departamento) => [departamento.id, departamento]),
    );

    return personas.map((persona) => {
      const departamento = departamentosPorId.get(persona.departmentId);
      if (!departamento) {
        throw new Error(`No existe el departamento ${persona.departmentId} de ${persona.id}.`);
      }

      return {
        id: persona.id,
        nombre: persona.nombre,
        apellidos: persona.apellidos,
        departamentoId: departamento.id,
        departamentoNombre: departamento.nombre,
      };
    });
  }
}