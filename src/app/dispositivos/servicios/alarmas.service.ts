import {Inject, Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {TipoDispositivo} from '../dispositivos';
import {SERVICIO_DISPOSITIVOS, ServicioDispositivos} from './i-dispositivos';

@Injectable({
  providedIn: 'root'
})
export class AlarmasService {

  private alarmas: Observable<Array<number>>;

  get alarmas$(): Observable<Array<number>> {
    return this.alarmas;
  }

  constructor(@Inject(SERVICIO_DISPOSITIVOS) private dispositivos: ServicioDispositivos) {
    this.alarmas = dispositivos.estados$.pipe(
      map(cambios => {
        const alarmasSonando = cambios.filter(dispositivo =>
          dispositivo.tipo === TipoDispositivo.ALARMA && dispositivo.estado === 'sonando');
        return alarmasSonando.map(alarma => alarma.id);
      })
    );
  }
}
