# Asignación de razas

Aplicación Expo con React Native, TypeScript, MVVM, Clean Architecture e Inversify. Los datos iniciales están en memoria para que el flujo se pueda probar sin configurar un servidor.

## Estructura

```text
src/
  domain/
    entities/                  Animal.ts, Raza.ts
    interfaces/repositories/   IAnimalRepository.ts, IRazaRepository.ts
  application/
    iUseCases/                 IListadoAnimalesFecha.ts, IActualizarAnimal.ts,
                               IListadoCompletoRazas.ts
    useCasesClases/            ListadoAnimalesFecha.ts, ActualizarAnimal.ts,
                               ListadoCompletoRazas.ts
  data/repositories/           AnimalRepository.ts, RazaRepository.ts
  presentation/
    models/                    AnimalConColor.ts
    mappers/                   AnimalConColorMapper.ts
    viewModels/                AnimalesViewModel.ts
    views/                     AsignarRazasView.tsx
  core/                        container.ts, types.ts
  app/                         _layout.tsx, index.tsx
```

## Reglas del ejercicio

- Se consulta la fecha local de hoy y se muestran únicamente animales cuya fecha de entrega coincide con ella.
- Los animales con `idRaza = 0` no tienen raza asignada; los que ya tienen raza se filtran en el caso de uso.
- Cada fila presenta nombre, sexo y un selector de raza. Las filas de machos son blancas y las de hembras azules.
- Guardar persiste solo las selecciones realizadas y muestra el número de animales actualizados.

## Responsabilidades y miembros públicos

El signo `+` indica miembro público y `-` miembro privado, como en el enunciado.

- `Animal`: `+id: number (get)`, `+nombre: string (get)`, `+sexo: SexoAnimal (get/set)`, `+idRaza: number (get)`, `+colorCelda: string (get)`, `+fechaDeEntrega: Date (get/set)`.
- `Raza`: `+idRaza: number (get)`, `+nombre: string (get/set)`.
- `IAnimalRepository`: `+getListadoFecha(fecha: Date): Animal[]`, `+actualizarAnimal(idAnimal: number, idRaza: number): boolean`.
- `IRazaRepository`: `+getListadosRazas(): Raza[]`.
- `IListadoAnimalesFecha`, `IActualizarAnimal` e `IListadoCompletoRazas` viven en `application/iUseCases` y definen respectivamente `+execute(fecha: Date): Animal[]`, `+execute(idAnimal: number, idRaza: number): boolean` y `+execute(): Raza[]`.
- `ListadoAnimalesFecha`, `ActualizarAnimal` y `ListadoCompletoRazas` viven en `application/useCasesClases`, implementan esos contratos e inyectan los repositorios correspondientes. El listado filtra los animales que ya tienen raza.
- `AnimalRepository`: implementa `IAnimalRepository` con `+getListadoFecha(fecha: Date): Animal[]` y `+actualizarAnimal(idAnimal: number, idRaza: number): boolean`.
- `RazaRepository`: implementa `IRazaRepository` con `+getListadosRazas(): Raza[]`.
- `AnimalConColor`: `+idAnimal`, `+nombreAnimal`, `+sexo`, `+colorFondo` (get) e `+idRazaSeleccionada` (get/set); `-asignarColor(): string` calcula el fondo a partir del sexo.
- `AnimalConColorMapper`: `+toModel(animal: Animal): AnimalConColor` y `+toModels(animales: Animal[]): AnimalConColor[]`; adapta entidades de dominio a modelos de presentación.
- `AnimalesViewModel`: `+fecha`, `+listadoAnimalConColor`, `+razas`, `+mensaje`, `+numActualizaciones` (get); `+seleccionarRaza(idAnimal: number, idRaza: number): void`; `+actualizarRazas(): void`. Usa el mapper al cargar y al volver a consultar el listado.
- `AsignarRazasView`: vista React Native que obtiene el ViewModel desde `container.ts`; `types.ts` contiene los identificadores de los contratos de inyección.

## Ejecutar

```sh
npm install
npm run start
```

`npm run typecheck` comprueba los tipos sin generar archivos.