# Pruebas de aceptación en Angular

Este es un repositorio de ejemplo en el que se muestra cómo implementar pruebas de aceptación en Angular contra la lógica de negocio (servicio) de gestión de habitaciones.

## Componentes clave

### Entidades
- [Habitacion](./src/app/habitaciones/habitacion.ts): Interfaz que representa los atributos básicos de una habitación

### Excepciones / Errores
- [HabitacionExistente](./src/app/habitaciones/errores/habitacion-existente.ts): Error que debe mostrarse cuando se intenta crear una habitación que ya existe

### Equeletos de modelos (Servicios)
- [HabitacionesService](./src/app/habitaciones/habitaciones.service.ts): Nuestro sistema a probar, se inyectará en el controlador (componente) de la vista para su uso desde la interfaz gráfica

### Pruebas de aceptación
- [HU01](./src/aceptacion/hu01.spec.ts): Listar habitaciones
- [HU02](./src/aceptacion/hu01.spec.ts): Crear habitaciones
- [HU03](./src/aceptacion/hu01.spec.ts): Escuchar cambios habitaciones

> **Nota**: Los números de historias y la funcionalidad que abarcan son totalmente arbitrarios y podrían no corresponderse con la funcionalidad final a implementar.

## Documentación adicional
- [Probando servicios en angular](https://angular.io/guide/testing-services): Cómo realizar pruebas unitarias y de intergración sobre servicios implementados en Angular

> **Nota**: El enlace anterior incluye información sobre cómo realizar pruebas de integración contra servicios empleando mocks. Este tipo de pruebas deben implementarse más adelante y por lo tanto no forman parte de la segunda entrega, 
