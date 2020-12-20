import { TestBed } from '@angular/core/testing';

import { AlarmasService } from './alarmas.service';
import {Subject} from 'rxjs';
import {Dispositivo, TipoDispositivo} from '../dispositivos';
import {take, toArray} from 'rxjs/operators';
import {SERVICIO_DISPOSITIVOS, ServicioDispositivos} from './i-dispositivos';

describe('AlarmasService', () => {
  let topicoEstados: Subject<Array<Dispositivo>>;
  let dispositivos: jasmine.SpyObj<ServicioDispositivos>;
  let alarmas: AlarmasService;


  beforeEach(() => {
    [dispositivos, topicoEstados] = crearMockServicioDispositivos();
    TestBed.configureTestingModule({providers: [{provide: SERVICIO_DISPOSITIVOS, useValue: dispositivos}]});
    alarmas = TestBed.inject(AlarmasService);
  });

  it('debería detectar los saltos de alarma', async () => {
    const saltosDeAlarma = alarmas.alarmas$.pipe(
      take(5),
      toArray()
    ).toPromise();

    topicoEstados.next([
      {id: 0, tipo: TipoDispositivo.SENSOR_MOVIMIENTO, estado: 'quieto'},
      {id: 1, tipo: TipoDispositivo.ALARMA, estado: 'apagada'},
    ]);

    topicoEstados.next([
      {id: 0, tipo: TipoDispositivo.SENSOR_MOVIMIENTO, estado: 'movimiento'},
      {id: 1, tipo: TipoDispositivo.ALARMA, estado: 'apagada'},
    ]);

    topicoEstados.next([
      {id: 0, tipo: TipoDispositivo.SENSOR_MOVIMIENTO, estado: 'movimiento'},
      {id: 1, tipo: TipoDispositivo.ALARMA, estado: 'sonando'},
    ]);

    topicoEstados.next([
      {id: 0, tipo: TipoDispositivo.SENSOR_MOVIMIENTO, estado: 'quieto'},
      {id: 1, tipo: TipoDispositivo.ALARMA, estado: 'sonando'},
    ]);

    topicoEstados.next([
      {id: 0, tipo: TipoDispositivo.SENSOR_MOVIMIENTO, estado: 'quieto'},
      {id: 1, tipo: TipoDispositivo.ALARMA, estado: 'apagada'},
    ]);

    const cambios = await saltosDeAlarma;
    expect(cambios[0]).toEqual([]);
    expect(cambios[1]).toEqual([]);
    expect(cambios[2]).toEqual([1]);
    expect(cambios[3]).toEqual([1]);
    expect(cambios[4]).toEqual([]);
  });
});

function crearMockServicioDispositivos(): [jasmine.SpyObj<ServicioDispositivos>, Subject<Array<Dispositivo>>] {
  const topicoEstados = new Subject<Array<Dispositivo>>();
  const mock = jasmine.createSpyObj(
    'DispositivosService',
    [],
    {estados$: topicoEstados}
    );
  return [mock, topicoEstados];
}
