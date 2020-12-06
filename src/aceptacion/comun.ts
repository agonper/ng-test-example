import {HabitacionesService} from '../app/habitaciones/habitaciones.service';
import {TestBed} from '@angular/core/testing';

export function obtenerServicioHabitaciones(): HabitacionesService {
  TestBed.configureTestingModule({});
  return  TestBed.inject(HabitacionesService);
}

export function limpiarEstado(): void {
  // TODO: Hacer limpieza
}
