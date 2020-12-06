import {Habitacion} from '../habitacion';

export class HabitacionExistente extends Error {
  constructor(habitacion: Habitacion) {
    super(`Ya existe una habitación llamada ${habitacion.nombre}`);
  }
}
