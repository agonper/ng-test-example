import {HabitacionesService} from '../app/habitaciones/habitaciones.service';
import {Habitacion} from '../app/habitaciones/habitacion';

import {limpiarEstado, obtenerServicioHabitaciones} from './comun';

describe('HU01: Listar habitaciones', () => {

  let habitaciones: HabitacionesService;

  beforeEach(() => {
    habitaciones = obtenerServicioHabitaciones();
  });

  it('debería devolver una lista vacía cuando no hay habitaciones', async () => {
    // Given: Estado inicial vacío

    // When: Obtenemos el listado de habitaciones
    const listado = await habitaciones.listado();

    // Then: El listado está vacío
    expect(listado.length).toBe(0);
  });

  it('deberia devolver una lista con 2 habitaciones cuando hay 2 habitaciones creadas', async () => {
    // Given: 2 habitaciones dadas de alta, Comedor y Cocina
    const comedor: Habitacion = { nombre: 'Comedor'};
    await habitaciones.crear(comedor);
    const cocina: Habitacion = { nombre: 'Cocina'};
    await habitaciones.crear(cocina);

    // When: Obtenemos el listado de habitaciones
    const listado = await habitaciones.listado();

    // Then: Contiene ambas habitaciones
    expect(listado.length).toBe(2);
    expect(listado.includes(comedor)).toBeTrue();
    expect(listado.includes(cocina)).toBeTrue();
  });

  afterEach(() => {
    limpiarEstado();
  });
});
