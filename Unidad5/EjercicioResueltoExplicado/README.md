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
- `src/application`: combina personas y departamentos para construir el DTO del listado.
- `src/data`: repositorios mock de personas y departamentos.
- `src/presentation`: mapper, ViewModel y pantalla responsive.
- `src/core`: tokens y configuración de dependencias de Inversify.
- `src/app`: rutas de Expo Router.

Los datos están en los repositorios mock. Cada `Departamento` define su color; el caso de uso lo incorpora al DTO para que la presentación pinte cada fila según su departamento.