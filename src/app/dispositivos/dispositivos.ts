export enum TipoDispositivo {
  ALARMA = 'alarma',
  SENSOR_MOVIMIENTO = 'sensor-movimiento'
}

export type Dispositivo = Alarma | SensorMovimiento;

export interface Alarma extends Identificable{
  tipo: TipoDispositivo.ALARMA;
  estado: 'sonando' | 'apagada';
}

export interface SensorMovimiento extends Identificable {
  tipo: TipoDispositivo.SENSOR_MOVIMIENTO;
  estado: 'movimiento' | 'quieto';
}

interface Identificable {
  id: number;
}
