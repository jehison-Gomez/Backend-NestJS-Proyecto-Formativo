import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { EstadoTraslado } from '../../dominio/traslado.entidad';

@Entity('Traslado')
export class TrasladoOrmEntidad {
  @PrimaryGeneratedColumn({ name: 'Traslado_ID' })
  trasladoId: number;

  @Column({ name: 'Fecha_Traslado', type: 'date' })
  fechaTraslado: Date;

  @Column({ name: 'Motivo', type: 'varchar', length: 500, nullable: true })
  motivo?: string;

  @Column({ name: 'Estado', type: 'enum', enum: EstadoTraslado, default: EstadoTraslado.PENDIENTE })
  estado: EstadoTraslado;

  @Column({ name: 'Usuario_ID', type: 'int' })
  usuarioId: number;

  @Column({ name: 'Ubicacion_Destino_ID', type: 'int' })
  ubicacionDestinoId: number;

  @Column({ name: 'Ubicacion_Origen_ID', type: 'int' })
  ubicacionOrigenId: number;
}