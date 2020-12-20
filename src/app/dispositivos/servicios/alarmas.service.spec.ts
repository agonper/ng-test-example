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
    // Creamos el mock
    [dispositivos, topicoEstados] = crearMockServicioDispositivos();
    // Configuramos el módulo de pruebas para que inyecte el mock en vez de la implementación de la interfaz
    TestBed.configureTestingModule({providers: [{provide: SERVICIO_DISPOSITIVOS, useValue: dispositivos}]});
    alarmas = TestBed.inject(AlarmasService);
  });

  it('debería detectar los saltos de alarma', async () => {
    const saltosDeAlarma = alarmas.alarmas$.pipe( // OJO, escuchamos pero no esperamos
      take(5),
      toArray()
    ).toPromise();

    // Simulamos la llegada de valores por el observable
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

    // También podríamos hacer
    // topicoEstados.error(new Error('Error a probar'));
    // Para probar cómo se comporta el servicio ante un error externo (de conexión, por ejemplo).

    // OJO, lanzar un error() por un subject es equivalente a un complete(), cierra el observable
    // y no puede volver a usarse.
    // Tened en cuenta esto a la hora de implementar vuestros observables / subjects.

    const cambios = await saltosDeAlarma; // Esperamos a que ser recojan los 5 cambios
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
    [ // Si nuestro servicio a reemplazar tiene métodos, indicar sus nombres aquí
      /* 'metodoDeEjemplo' */
    ],
    {estados$: topicoEstados} // Podemos configurar el valor a devolver por sus propiedades públicas
    );

  // Para configurar el comportamiento de un método (en lugar de una propiedad), haríamos lo siguiente:
  // Para devolver siempre lo mismo
  // mock.metodoDeEjemplo.and.returnValue(/* valor a devolver al llamar al método */);
  // Para devolver algo en función de los argumentos de llamada al método
  // mock.metodoDeEjemplo.withArgs(/* valor argumentos */)
  //   .and.returnValue(/* valor a devolver por el método cuando los argumentos coincidan con los indicados en 'valor agumentos'*/);

  // POSTERIORMENTE, en cada prueba, podemos comprobar si el método se ha llamado con:
  // expect(mock.metodoDeEjemplo).toHaveBeenCalled(); // Se ha llamado
  // expect(mock.metodoDeEjemplo).toHaveBeenCalledWith(/* Argumentos */); // Se ha llamado con unos argumentos concretos
  // expect(mock.metodoDeEjemplo).toHaveBeenCalledTimes(/* veces */); // Se ha llamado n veces
  // expect(mock.metodoDeEjemplo).toHaveBeenCalledOnceWith(/* Argumentos */); // Se ha llamado una vez con unos argumentos concretos

  return [mock, topicoEstados]; // Tupla con el mock y el valor con capacidad de escritura de su propiedad pública
}
