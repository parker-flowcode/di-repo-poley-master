# PeopleListDI

Aplicacion Expo con MVVM e inyeccion de dependencias mediante InversifyJS.

## Ejecutar

```sh
npm install
npm run start
```

## Probar los repositorios

En `src/core/container.ts`, cambia `repositoryImplementation` por una de estas clases y reinicia Expo:

- `RepositoryPersona`: seis personas.
- `RepositoryPersonaVacio`: comprueba el mensaje "El listado está vacío".
- `RepositoryPersona100`: comprueba que `FlatList` permite desplazarse.

La pantalla filtra hombres en días pares y mujeres en días impares. Para comprobar ambos casos el mismo día, se pueden ejecutar `mostrarHombresDiasPares()` y `mostrarMujeresDiasImpares()` desde `PersonasUseCases`.