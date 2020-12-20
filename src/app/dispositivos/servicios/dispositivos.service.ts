import {Injectable} from '@angular/core';
import {Observable, ReplaySubject} from 'rxjs';
import {Dispositivo, TipoDispositivo} from '../dispositivos';
import {ServicioDispositivos} from './i-dispositivos';

@Injectable({
  providedIn: 'root'
})
export class DispositivosService implements ServicioDispositivos {

  private estados: ReplaySubject<Array<Dispositivo>> = new ReplaySubject<Array<Dispositivo>>(1);

  get estados$(): Observable<Array<Dispositivo>> {
    return this.estados;
  }

  constructor() {
    let veces = 0;
    setInterval(() => {
      this.estados.next(crearCambios(veces % 4));
      veces++;
    }, 1000);
  }
}

function crearCambios(veces: number): Array<Dispositivo> {
  switch (veces) {
    case 0:
      return [
        crearEstado(TipoDispositivo.SENSOR_MOVIMIENTO, false),
        crearEstado(TipoDispositivo.ALARMA, false),
      ];
    case 1:
      return [
        crearEstado(TipoDispositivo.SENSOR_MOVIMIENTO, true),
        crearEstado(TipoDispositivo.ALARMA, false),
      ];
    case 2:
      return [
        crearEstado(TipoDispositivo.SENSOR_MOVIMIENTO, true),
        crearEstado(TipoDispositivo.ALARMA, true),
      ];
    case 3:
      return [
        crearEstado(TipoDispositivo.SENSOR_MOVIMIENTO, false),
        crearEstado(TipoDispositivo.ALARMA, true),
      ];
    default:
      throw new Error('Fuera de rango');
  }
}

function crearEstado(tipo: TipoDispositivo, activo: boolean): Dispositivo {
  switch (tipo) {
    case TipoDispositivo.ALARMA:
      return {id: 1, tipo: TipoDispositivo.ALARMA, estado: activo ? 'sonando' : 'apagada'};
    case TipoDispositivo.SENSOR_MOVIMIENTO:
      return {id: 0, tipo: TipoDispositivo.SENSOR_MOVIMIENTO, estado: activo ? 'movimiento' : 'quieto'};
    default:
      throw new Error('Unimplemented');
  }
}
