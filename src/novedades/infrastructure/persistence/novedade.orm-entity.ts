import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { NovedadeEstado } from '../../domain/novedade-estado.enum';
import { NovedadeTipo } from '../../domain/novedade-tipo.enum';
import { UsuarioOrmEntity } from 'src/usuarios/infrastructure/persistence/usuario.orm-entity';
import { DevolucioneOrmEntity } from 'src/devoluciones/infrastructure/persistence/devolucione.orm-entity';

@Entity('novedades')
export class NovedadeOrmEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'text' })
  descripcion: string;

  @Column({ type: 'enum', enum: NovedadeTipo })
  tipo: NovedadeTipo;

  @Column({ type: 'enum', enum: NovedadeEstado, default: NovedadeEstado.ACTIVO })
  estado: NovedadeEstado;

  @ManyToOne(() => UsuarioOrmEntity, { nullable: false, onDelete: 'RESTRICT' })
  @JoinColumn({ name: 'usuario_id' })
  usuario: UsuarioOrmEntity;

  @ManyToOne(() => DevolucioneOrmEntity, { nullable: false, onDelete: 'RESTRICT' })
  @JoinColumn({ name: 'devolucion_id' })
  devolucion: DevolucioneOrmEntity;

  @CreateDateColumn({ name: 'creado_en' })
  creadoEn: Date;

  @UpdateDateColumn({ name: 'actualizado_en' })
  actualizadoEn: Date;
}
