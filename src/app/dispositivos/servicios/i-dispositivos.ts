import {Observable} from 'rxjs';
import {Dispositivo} from '../dispositivos';
import {InjectionToken} from '@angular/core';

export const SERVICIO_DISPOSITIVOS = new InjectionToken<ServicioDispositivos>('ServicioDispositivos');

export interface ServicioDispositivos {
  estados$: Observable<Array<Dispositivo>>;
}
