export class Persona {
  constructor(
    readonly id: string,
    readonly nombre: string,
    readonly apellidos: string,
    readonly departmentId: number,
  ) {}

  get nombreCompleto(): string {
    return `${this.nombre} ${this.apellidos}`;
  }
}