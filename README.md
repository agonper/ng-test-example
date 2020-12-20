# Creación de pruebas en Angular

Este es un repositorio de ejemplo en el que se muestra cómo implementar pruebas de aceptación, integración y unitarias en Angular.

Proyecto tutorial para la asignatura Paradigmas de Software (EI1048) del Grado en Ingeniería Informática de la Universitat Jaume I (UJI) de Castellón, España.

## Componentes clave

### Entidades
- [Habitacion](./src/app/habitaciones/habitacion.ts): Interfaz que representa los atributos básicos de una habitación
- [Dispositivo](./src/app/dispositivos/dispositivos.ts): Jerarquía de interfaces para la representación de varios dispositivos.

> **Nota**: Aunque este ejemplo se inspira en el tópico del proyecto de prácticas, estas entidades únicamente tienen en común con las entidades del proyecto sus nombres. _No utilizar estas entidades en el proyecto final_

### Excepciones / Errores
- [HabitacionExistente](./src/app/habitaciones/errores/habitacion-existente.ts): Error que debe mostrarse cuando se intenta crear una habitación que ya existe

### Equeletos de modelos (Servicios)
- [HabitacionesService](./src/app/habitaciones/habitaciones.service.ts): Nuestro sistema a probar, se inyectará en el controlador (componente) de la vista para su uso desde la interfaz gráfica
- [DispositivosService](./src/app/dispositivos/servicios/dispositivos.service.ts): Otro ejemplo de sistema a probar, este actúa como dependencia de otro servicio de la aplicación. Implementa una interfaz.
- [AlarmasService](./src/app/dispositivos/servicios/alarmas.service.ts): Otro sistema a probar. En este caso, con una dependencia que debería ser reemplazada durante las pruebas.

### Interfaces
- [ServicioDispositivos](./src/app/dispositivos/servicios/i-dispositivos.ts): Ejemplo de interfaz de servicio, implementada por [DispositivosService](./src/app/dispositivos/servicios/dispositivos.service.ts).

> Ejemplo de inyección de dependencias con interfaces [aquí](./src/app/app.module.ts).

## Pruebas de aceptación

Pruebas lanzadas contra el [HabitacionesService](./src/app/habitaciones/habitaciones.service.ts). Ayudan a verificar que el sistema cumple con todas las funcionalidades acordadas.

- [HU01](./src/aceptacion/hu01.spec.ts): Listar habitaciones
- [HU02](./src/aceptacion/hu02.spec.ts): Crear habitaciones
- [HU03](./src/aceptacion/hu03.spec.ts): Escuchar cambios habitaciones

> **Nota**: Los números de historias y la funcionalidad que abarcan son totalmente arbitrarios y podrían no corresponderse con la funcionalidad final a implementar.

## Pruebas de integración

Pruebas lanzadas contra servicios que presentan alguna dependencia en otro servicio. Dependencias que son reemplazadas mediante mocks.

- [AlarmasService](./src/app/dispositivos/servicios/alarmas.service.spec.ts): Prueba de integración del servicio de alarmas, en la cual se reemplaza el servicio de dispositivos con un mock.

## Pruebas unitarias

Pruebas lanzadas contra servicios que no presentan ninguna dependencia

- [DispositivosService](./src/app/dispositivos/servicios/dispositivos.service.spec.ts): Prueba del servicio de dispositivos local, que en este ejemplo no tiene ninguna dependencia externa.

## _Bonus track_

Manejo de Observables (RxJS) en vistas:

- [HTML (Vista)](./src/app/app.component.html)
- [Code behind (Controlador)](./src/app/app.component.ts)

## Documentación adicional
- [Probando servicios en Angular](https://angular.io/guide/testing-services): Cómo realizar pruebas unitarias y de intergración sobre servicios implementados en Angular. 
- [Documentación RxJS](https://rxjs-dev.firebaseapp.com/guide/overview): Para resolver dudas sobre el manejo de las primitivas de RxJS.
- [Técnicas de manejo de errores en Observables (RxJS)](https://blog.angular-university.io/rxjs-error-handling/): Diferentes técnicas de captura y manejo de errores en RxJS.

> **Nota**: El enlace anterior incluye información sobre cómo realizar pruebas de integración contra servicios empleando mocks. Este tipo de pruebas deben implementarse más adelante y por lo tanto no forman parte de la segunda entrega, 
