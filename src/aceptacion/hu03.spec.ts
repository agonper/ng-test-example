import {HabitacionesService} from '../app/habitaciones/habitaciones.service';
import {Habitacion} from '../app/habitaciones/habitacion';

import {limpiarEstado, obtenerServicioHabitaciones} from './comun';
import {take, toArray} from 'rxjs/operators';

describe('HU03: Observar cambios en las habitaciones', () => {
  let habitaciones: HabitacionesService;

  beforeEach(() => {
    habitaciones = obtenerServicioHabitaciones();
  });

  it('debería informar sobre el estado inicial al iniciar la aplicación por primera vez', async () => {
    const escucharCambios = habitaciones.cambios()
      .pipe(
        take(1) // Solo nos interesa obtener el primer cambio de estado (indeterminado -> estado inicial)
      ).toPromise(); // Al convertir el observable a promesa podemos esperar hasta que se devuelva el estado inicial

    const estadoInicial = await escucharCambios;

    expect(estadoInicial.length).toBe(0);
  });

  it('debería reportar sobre la creación de una nueva habitación', async () => {
    const escucharCambios = habitaciones.cambios() // Ojo, no esperamos a que la promesa se resuelva todavía
      .pipe(
        take(2), // Observaremos dos cambios: indeterminado -> estado inicial -> primera habitación creada
        toArray() // Queremos obtener los cambios como un listado (una lista de listas de habitaciones)
                  // En el test anterior no era necesario porque solo estábamos esperando un cambio (takes(1))
      ).toPromise();
    // Primer cambio de estado: indeterminado -> estado inicial

    const comedor: Habitacion = { nombre: 'Comedor' };
    await habitaciones.crear(comedor);
    // Segundo cambio de estado: estado inicial -> primera habitación creada

    // Hasta ahora la promesa estaba trabajando de forma asíncrona.
    // Bloqueamos la ejecución para que lleguen hasta que se notifiquen todos los cambios
    const cambios = await escucharCambios;

    //       cambios[0]        cambios[1]     -> Array destructuring (+ info: https://mzl.la/36PyUW9)
    const [estadoInicial, primeraHabitacion] = cambios;

    expect(estadoInicial.length).toBe(0); // -> []
    expect(primeraHabitacion.length).toBe(1); // -> [{nombre: 'Comedor'}]
    expect(primeraHabitacion[0]).toEqual(comedor);
  });

  afterEach(() => {
    limpiarEstado();
  });
});
