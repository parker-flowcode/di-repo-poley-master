import { injectable } from 'inversify';
import { Animal } from '../../domain/entities/Animal';
import { IAnimalRepository } from '../../domain/interfaces/repositories/IAnimalRepository';

function mismaFecha(dia: Date, otraFecha: Date): boolean {
  return dia.getFullYear() === otraFecha.getFullYear()
    && dia.getMonth() === otraFecha.getMonth()
    && dia.getDate() === otraFecha.getDate();
}

function desplazarDia(fecha: Date, dias: number): Date {
  const resultado = new Date(fecha);
  resultado.setDate(resultado.getDate() + dias);
  return resultado;
}

@injectable()
export class AnimalRepository implements IAnimalRepository {
  private readonly animales: Animal[];

  constructor() {
    const hoy = new Date();
    this.animales = [
      new Animal(1, 'Lucero', 'Macho', 0, '#ffffff', hoy),
      new Animal(2, 'Azahara', 'Hembra', 0, '#e8f3ff', hoy),
      new Animal(3, 'Centella', 'Hembra', 2, '#e8f3ff', hoy),
      new Animal(4, 'Relámpago', 'Macho', 0, '#ffffff', hoy),
      new Animal(5, 'Gitana', 'Hembra', 0, '#e8f3ff', desplazarDia(hoy, -1)),
    ];
  }

  getListadoFecha(fecha: Date): Animal[] {
    return this.animales.filter((animal) => mismaFecha(animal.fechaDeEntrega, fecha));
  }

  actualizarAnimal(idAnimal: number, idRaza: number): boolean {
    const indice = this.animales.findIndex((item) => item.id === idAnimal);
    const animal = this.animales[indice];

    // Esta segunda validación protege el dato aunque se llame al repositorio fuera de la pantalla.
    if (indice < 0 || !animal || animal.idRaza !== 0 || idRaza <= 0) {
      return false;
    }

    this.animales[indice] = new Animal(
      animal.id,
      animal.nombre,
      animal.sexo,
      idRaza,
      animal.colorCelda,
      animal.fechaDeEntrega,
    );
    return true;
  }
}