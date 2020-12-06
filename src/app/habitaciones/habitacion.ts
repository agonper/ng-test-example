export interface Habitacion {
  id?: number;
  nombre: string;
}

// Las entidades también pueden representarse con clases siguiendo un
// estilo más similar a los POJO de Java. El equivalente en clase
// TypeScript de la interfaz anterior sería el siguiente:

/*export class Habitacion {
  constructor(
    public nombre: string,
    public id?: number
  ) {}
}*/

// Aunque esto se puede hacer, en TypeScript es más habitual declarar los
// tipos de datos complejos como interfaces (siempre y cuando no sea
// necesario añadir algún método / campo calculado al tipo de datos).
// De esta forma se pueden emplear objetos planos (sin lógica) para
// el intercambio de información dentro del dominio de la aplicación.
