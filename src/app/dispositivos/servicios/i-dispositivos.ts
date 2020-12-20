import {Observable} from 'rxjs';
import {Dispositivo} from '../dispositivos';
import {InjectionToken} from '@angular/core';

// Token de inyección. Necesario debido a que las interfaces TypeScript no existen en tiempo de ejecución
export const SERVICIO_DISPOSITIVOS = new InjectionToken<ServicioDispositivos>('ServicioDispositivos');

export interface ServicioDispositivos {
  estados$: Observable<Array<Dispositivo>>;
}
