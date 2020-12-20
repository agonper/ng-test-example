import {TestBed} from '@angular/core/testing';

import {DispositivosService} from './dispositivos.service';
import {take, toArray} from 'rxjs/operators';
import {TipoDispositivo} from '../dispositivos';

describe('DispositivosService', () => {
  let dispositivos: DispositivosService;
  let timeoutPorDefecto: number;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    dispositivos = TestBed.inject(DispositivosService);

    // Modificamos el timeout de las pruebas, ya que está previsto que tarden más de 5 segundos (valor por defecto)
    timeoutPorDefecto = jasmine.DEFAULT_TIMEOUT_INTERVAL;
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000; // 10s (en milisegundos)
  });

  it('debería devolver diferentes estados de los dispositivos', async () => {
    const [estadoInicial, movimiento, salto, calma, apagado] = await dispositivos.estados$.pipe(
      take(5),
      toArray()
    ).toPromise();

    expect(estadoInicial).toEqual([
      {id: 0, tipo: TipoDispositivo.SENSOR_MOVIMIENTO, estado: 'quieto'},
      {id: 1, tipo: TipoDispositivo.ALARMA, estado: 'apagada'},
    ]);

    expect(movimiento).toEqual([
      {id: 0, tipo: TipoDispositivo.SENSOR_MOVIMIENTO, estado: 'movimiento'},
      {id: 1, tipo: TipoDispositivo.ALARMA, estado: 'apagada'},
    ]);

    expect(salto).toEqual([
      {id: 0, tipo: TipoDispositivo.SENSOR_MOVIMIENTO, estado: 'movimiento'},
      {id: 1, tipo: TipoDispositivo.ALARMA, estado: 'sonando'},
    ]);

    expect(calma).toEqual([
      {id: 0, tipo: TipoDispositivo.SENSOR_MOVIMIENTO, estado: 'quieto'},
      {id: 1, tipo: TipoDispositivo.ALARMA, estado: 'sonando'},
    ]);

    expect(apagado).toEqual([
      {id: 0, tipo: TipoDispositivo.SENSOR_MOVIMIENTO, estado: 'quieto'},
      {id: 1, tipo: TipoDispositivo.ALARMA, estado: 'apagada'},
    ]);
  });

  afterEach(() => {
    jasmine.DEFAULT_TIMEOUT_INTERVAL = timeoutPorDefecto;
  });
});
