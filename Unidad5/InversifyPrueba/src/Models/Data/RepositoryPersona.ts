import { injectable } from 'inversify';
import { Persona } from '../Entities/Persona';
import { IRepositoryPersona } from '../../Domain/Interfaces/Repositories/IRepositoryPersona';

@injectable()
export class RepositoryPersona implements IRepositoryPersona {
  getPersonas(): Persona[] {
    return [
      new Persona('TEST0001', 'Leire', 'Díaz', new Date(1990, 3, 12), 'Mujer'),
      new Persona('TEST0002', 'José Luis', 'Ábalos', new Date(1994, 8, 24), 'Hombre'),
      new Persona('TEST0003', 'Portero', 'Koldo', new Date(1987, 1, 3), 'Hombre'),
      new Persona('TEST0004', 'Oscar', 'Bus', new Date(1992, 6, 18), 'Hombre'),
      new Persona('TEST0005', 'Yolanda', 'Díaz', new Date(1985, 10, 7), 'Mujer'),
      new Persona('TEST0006', 'Carlos', 'Cabeza', new Date(1996, 11, 29), 'Hombre'),
      new Persona('TEST0007', 'Joyas', 'Zapatero', new Date(1989, 2, 14), 'Hombre'),
      new Persona('TEST0008', 'Pedro', 'Poley', new Date(1991, 5, 9), 'Hombre'),
      new Persona('TEST0009', 'Begoña', 'Gomez', new Date(1993, 7, 21), 'Mujer'),
      new Persona('TEST0010', 'Santiago', 'Trump', new Date(1988, 0, 5), 'Hombre'),
      new Persona('TEST0011', 'Carlos', 'Kirk', new Date(1995, 4, 17), 'Hombre'),
    ];
  }
}

@injectable()
export class RepositoryPersonaVacio implements IRepositoryPersona {
  getPersonas(): Persona[] {
    return [];
  }
}

@injectable()
export class RepositoryPersona100 implements IRepositoryPersona {
  getPersonas(): Persona[] {
    return Array.from({ length: 100 }, (_, index) => {
      const number = index + 1;
      const genero = number % 2 === 0 ? 'Mujer' : 'Hombre';
      return new Persona(
        `TEST${number.toString().padStart(4, '0')}`,
        `Persona ${number}`,
        'de prueba',
        new Date(1980 + (index % 25), index % 12, (index % 28) + 1),
        genero,
      );
    });
  }
}