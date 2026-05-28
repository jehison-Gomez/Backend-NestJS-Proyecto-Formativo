import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { Usuario_movimientoEstado } from '../../domain/usuario_movimiento-estado.enum';
import { UsuarioOrmEntity } from 'src/usuarios/infrastructure/persistence/usuario.orm-entity';
import { MovimientoOrmEntity } from 'src/movimientos/infrastructure/persistence/movimiento.orm-entity';

@Entity('usuario_movimiento')
export class Usuario_movimientoOrmEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'enum', enum: Usuario_movimientoEstado, default: Usuario_movimientoEstado.ACTIVO })
  estado: Usuario_movimientoEstado;

  @ManyToOne(() => UsuarioOrmEntity, { nullable: false, onDelete: 'RESTRICT' })
  @JoinColumn({ name: 'usuario_id' })
  usuario: UsuarioOrmEntity;

  @ManyToOne(() => MovimientoOrmEntity, { nullable: false, onDelete: 'RESTRICT' })
  @JoinColumn({ name: 'movimiento_id' })
  movimiento: MovimientoOrmEntity;

  @CreateDateColumn({ name: 'creado_en' })
  creadoEn: Date;

  @UpdateDateColumn({ name: 'actualizado_en' })
  actualizadoEn: Date;
}
