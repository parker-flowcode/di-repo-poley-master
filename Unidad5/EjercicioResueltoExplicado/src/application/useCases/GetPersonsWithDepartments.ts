import { inject, injectable } from 'inversify';
import { PersonaConDepartamentoDTO } from '../../domain/DTO/PersonaConDepartamentoDTO';
import { IRepositoryDepartamento } from '../../domain/interfaces/repositories/IRepositoryDepartamento';
import { IRepositoryPersona } from '../../domain/interfaces/repositories/IRepositoryPersona';
import { IGetPersonsWithDepartments } from '../../domain/interfaces/useCases/IGetPersonsWithDepartments';
import { TYPES } from '../../core/types';

@injectable()
export class GetPersonsWithDepartments implements IGetPersonsWithDepartments {
  constructor(
    @inject(TYPES.IRepositoryPersona)
    private readonly personasRepository: IRepositoryPersona,
    @inject(TYPES.IRepositoryDepartamento)
    private readonly departamentosRepository: IRepositoryDepartamento,
  ) {}

  async execute(): Promise<PersonaConDepartamentoDTO[]> {
    const [personas, departamentos] = await Promise.all([
      this.personasRepository.getPersonas(),
      this.departamentosRepository.getDepartamentos(),
    ]);
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
        departamentoNombre: departamento.nombre,
        departamentoColor: departamento.color,
      };
    });
  }
}