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

  // Utilizamos un token de inyección, ya que las interfaces en TypeScript no existen en tiempo de ejecución
  constructor(@Inject(SERVICIO_DISPOSITIVOS) private dispositivos: ServicioDispositivos) {
    this.alarmas = dispositivos.estados$.pipe(
      map(cambios => { // Por cada cambio de estado
        const alarmasSonando = cambios.filter(dispositivo => // Nos quedamos con las alarmas activas únicamente
          dispositivo.tipo === TipoDispositivo.ALARMA && dispositivo.estado === 'sonando');
        return alarmasSonando.map(alarma => alarma.id); // Y de ellas, nos quedamos únicamente con su id
      })
    );
  }
}
