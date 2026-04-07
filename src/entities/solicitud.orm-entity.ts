import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

export enum TipoSolicitud {
  PRESTAMO = 'PRESTAMO',
  DEVOLUCION = 'DEVOLUCION',
}

export enum EstadoSolicitud {
  PENDIENTE = 'PENDIENTE',
  APROBADA = 'APROBADA',
  RECHAZADA = 'RECHAZADA',
}

@Entity('Solicitud')
export class Solicitud {
  @PrimaryGeneratedColumn({ name: 'ID_Solicitud' })
  id: number;

  @Column({ name: 'Fecha_Solicitud', type: 'timestamp' })
  fechaSolicitud: Date;

  @Column({ name: 'Duracion_Estimada', type: 'int' })
  duracionEstimada: number;

  @Column({ name: 'Fecha_Requerida', type: 'date' })
  fechaRequerida: Date;

  @Column({ name: 'Descripcion', type: 'varchar', length: 255 })
  descripcion: string;

  @Column({ name: 'Tipo', type: 'enum', enum: TipoSolicitud })
  tipo: TipoSolicitud;

  @Column({ name: 'Estado', type: 'enum', enum: EstadoSolicitud })
  estado: EstadoSolicitud;

  @Column({ name: 'Cantidad_Aprendices', type: 'int' })
  cantidadAprendices: number;

  @Column({ name: 'FK_ID_Solicitante', type: 'int' })
  solicitanteId: number;

  @Column({ name: 'FK_ID_Aprobador', type: 'int' })
  aprobadorId: number;

  @Column({ name: 'FK_ID_Ficha', type: 'int' })
  fichaId: number;
}
