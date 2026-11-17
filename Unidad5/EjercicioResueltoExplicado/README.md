# Personas por departamento

Aplicación Expo con React Native, InversifyJS y arquitectura por capas. Muestra nombre, apellidos y departamento de cada persona; el color de la fila procede del departamento asociado.

## Ejecutar

```powershell
npm.cmd install
npm.cmd run typecheck
npm.cmd run web
```

## Estructura

- `src/domain`: entidades inmutables, DTO e interfaces de repositorio y caso de uso.
- `src/application`: caso de uso que solicita el listado combinado al repositorio de personas.
- `src/data`: repositorios mock; el repositorio de personas combina personas y departamentos para construir el DTO del listado.
- `src/presentation`: mapper, ViewModel y pantalla responsive.
- `src/core`: tokens y configuración de dependencias de Inversify.
- `src/app`: rutas de Expo Router.

Los datos están en los repositorios mock. `Departamento` solo contiene su identidad y nombre; `DomainToUIMapper` asigna el color de fila por ID como un detalle de presentación.