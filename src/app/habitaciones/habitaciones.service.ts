import { Injectable } from '@angular/core';
import { Habitacion } from './habitacion';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HabitacionesService {

  constructor() { }

  async crear(habitacion: Habitacion): Promise<number> {
    throw new Error('Unimplemented');
  }

  async listado(): Promise<Array<Habitacion>> {
    throw new Error('Unimplemented');
  }

  cambios(): Observable<Array<Habitacion>> {
    throw new Error('Unimplemented');
  }
}
