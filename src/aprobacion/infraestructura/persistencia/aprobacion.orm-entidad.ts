import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { EstadoAprobacion } from '../../dominio/aprobacion.entidad.js';

@Entity('Aprobacion')
export class AprobacionOrmEntidad {
  @PrimaryGeneratedColumn({ name: 'id_aprobacion' })
  idAprobacion: number;

  @Column({ name: 'fechaAprobacion', type: 'date', nullable: true })
  fechaAprobacion?: Date;

  @Column({ name: 'estado', type: 'enum', enum: EstadoAprobacion })
  estado: EstadoAprobacion;

  @Column({ name: 'observacion', type: 'text', nullable: true })
  observacion?: string;

  @Column({ name: 'nivel', type: 'int', nullable: true })
  nivel?: number;

  @Column({ name: 'id_prestamo', type: 'int' })
  idPrestamo: number;
  
  @Column({ name: 'id_aprobador', type: 'int' })
  idAprobador: number;
}