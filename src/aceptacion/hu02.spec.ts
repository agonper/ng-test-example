import {HabitacionesService} from '../app/habitaciones/habitaciones.service';
import {Habitacion} from '../app/habitaciones/habitacion';
import {HabitacionExistente} from '../app/habitaciones/errores/habitacion-existente';

import {limpiarEstado, obtenerServicioHabitaciones} from './comun';

describe('HU02: Crear habitaciones', () => {
  let habitaciones: HabitacionesService;

  beforeEach(() => {
    habitaciones = obtenerServicioHabitaciones();
  });

  it('debería crear una habitación que no existe', async () => {
    // Given: Un nombre de habitación y ninguna habitación creada previamente
    const nombre = 'Comedor';

    // When: Creamos una habitación con dicho nombre
    const comedor: Habitacion = { nombre }; // -> Equivalente a { nombre: nombre }
    const id = await habitaciones.crear(comedor);

    // Then: La habitación se crea sin problemas
    expect(id).toEqual(jasmine.any(Number));
  });

  it('debería mostrar un error cuando la habitación a crear ya existe', async () => {
    // Given: Una habitación ya creada
    const comedor: Habitacion = {nombre: 'Comedor'};
    await habitaciones.crear(comedor);

    // When: Intentamos crear una habitación con el mismo nombre
    await expectAsync(habitaciones.crear(comedor))
      // Then: La habitación no puede crearse porque ya existe otra con dicho nombre
      .toBeRejectedWith(new HabitacionExistente(comedor));
  });

  afterEach(() => {
    limpiarEstado();
  });
});
