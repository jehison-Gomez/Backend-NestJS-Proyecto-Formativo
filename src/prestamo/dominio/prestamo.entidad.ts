export enum EstadoPrestamo {
  PENDIENTE = 'PENDIENTE',
  APROBADO = 'APROBADO',
  RECHAZADO = 'RECHAZADO',
  ENTREGADO = 'ENTREGADO',
  DEVUELTO = 'DEVUELTO',
}

export class Prestamo {
  idPrestamo: number;
  codigoPrestamo: string;
  fechaSolicitud: Date;
  fechaAprobacion?: Date;
  fechaVencimiento?: Date;
  estado: EstadoPrestamo;
  observacion?: string;
  idUsuario: number;
}