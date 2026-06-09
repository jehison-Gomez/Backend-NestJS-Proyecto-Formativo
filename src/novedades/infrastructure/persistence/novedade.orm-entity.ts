import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { NovedadeEstado } from '../../domain/novedade-estado.enum';
import { NovedadeTipo } from '../../domain/novedade-tipo.enum';
import { UsuarioOrmEntity } from 'src/usuarios/infrastructure/persistence/usuario.orm-entity';

@Entity('novedades')
export class NovedadeOrmEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'text' })
  descripcion: string;

  @Column({ type: 'enum', enum: NovedadeTipo })
  tipo: NovedadeTipo;

  @Column({ type: 'enum', enum: NovedadeEstado, default: NovedadeEstado.PENDIENTE })
  estado: NovedadeEstado;

  @ManyToOne(() => UsuarioOrmEntity, { nullable: false, onDelete: 'RESTRICT' })
  @JoinColumn({ name: 'reportado_por_id' })
  reportadoPor: UsuarioOrmEntity;

  // devolucion_item_id se añadirá cuando DevolucionItemOrmEntity esté disponible
  @Column({ type: 'uuid', nullable: true, name: 'devolucion_item_id' })
  devolucionItemId: string | null;

  @CreateDateColumn({ name: 'creado_en' })
  creadoEn: Date;

  @UpdateDateColumn({ name: 'actualizado_en' })
  actualizadoEn: Date;
}
