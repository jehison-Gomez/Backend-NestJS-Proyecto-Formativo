import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { EstadoPrestamo } from '../../dominio/prestamo.entidad.js';

@Entity('Prestamo')
export class PrestamoOrmEntidad {
  @PrimaryGeneratedColumn({ name: 'id_prestamo' })
  idPrestamo: number;

  @Column({ name: 'codigoPrestamo', type: 'varchar', length: 30, unique: true })
  codigoPrestamo: string;

  @Column({ name: 'fechaSolicitud', type: 'date' })
  fechaSolicitud: Date;

  @Column({ name: 'fechaAprobacion', type: 'date', nullable: true })
  fechaAprobacion?: Date;

  @Column({ name: 'fechaVencimiento', type: 'date', nullable: true })
  fechaVencimiento?: Date;

  @Column({ name: 'estado', type: 'enum', enum: EstadoPrestamo })
  estado: EstadoPrestamo;

  @Column({ name: 'observacion', type: 'text', nullable: true })
  observacion?: string;

  @Column({ name: 'id_usuario', type: 'int' })
  idUsuario: number;
}