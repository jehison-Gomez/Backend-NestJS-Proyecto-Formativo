export enum TipoSolicitud {
  PRESTAMO = 'PRESTAMO',
  DEVOLUCION = 'DEVOLUCION',
}

export enum EstadoSolicitud {
  PENDIENTE = 'PENDIENTE',
  APROBADA = 'APROBADA',
  RECHAZADA = 'RECHAZADA',
}

export class Solicitud {
  id!: number;
  fechaSolicitud!: Date;
  duracionEstimada!: number;
  fechaRequerida!: Date;
  descripcion!: string;
  tipo!: TipoSolicitud;
  estado!: EstadoSolicitud;
  cantidadAprendices!: number;
  solicitanteId!: number;
  aprobadorId!: number;
  fichaId!: number;
}
