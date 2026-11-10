# Persona del día

App Expo con React Native, InversifyJS y una arquitectura por capas. Cada día de la semana muestra una de las siete personas: domingo corresponde al índice 0 y sábado al índice 6.

## Ejecutar

```powershell
npm.cmd install
npm.cmd run typecheck
npm.cmd run web
```

También puedes usar `npm.cmd run android` con un emulador Android abierto.

## Estructura

- `src/domain`: entidad Persona e interfaces de repositorio y casos de uso.
- `src/application`: lógica que elige a la persona del día.
- `src/data`: repositorio mock con siete personas.
- `src/presentation`: ViewModel, pantalla React Native, DTO `PersonaConColor` y `PersonaMapper`.
- `src/core`: tokens y configuración de Inversify, incluido el mapper.
- `src/app`: rutas Expo Router.

El selector semanal permite previsualizar cualquiera de los siete perfiles; al abrir la app se selecciona automáticamente el día actual. Cada perfil recibe un color propio según su posición del domingo (0) al sábado (6), mediante `PersonaMapper` inyectado con Inversify.