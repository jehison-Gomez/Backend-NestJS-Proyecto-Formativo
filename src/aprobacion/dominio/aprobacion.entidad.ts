export enum EstadoAprobacion {
  PENDIENTE = 'PENDIENTE',
  APROBADO = 'APROBADO',
  RECHAZADO = 'RECHAZADO',
}
export class Aprobacion {
  idAprobacion: number;
  fechaAprobacion?: Date;
  estado: EstadoAprobacion;
  observacion?: string;
  nivel?: number;
  idPrestamo: number;  
  idAprobador: number;  
}