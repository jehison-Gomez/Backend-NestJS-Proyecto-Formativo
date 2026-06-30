import { CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, Unique, UpdateDateColumn } from 'typeorm';
import { UsuarioOrmEntity } from 'src/usuarios/infrastructure/persistence/usuario.orm-entity';
import { PermisoOrmEntity } from 'src/permisos/infrastructure/persistence/permiso.orm-entity';

@Entity('usuario_permisos')
@Unique('UQ_usuario_permiso', ['usuario', 'permiso'])
export class Usuario_permisoOrmEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => UsuarioOrmEntity, { nullable: false, onDelete: 'CASCADE' })
  @JoinColumn({ name: 'usuario_id' })
  usuario: UsuarioOrmEntity;

  @ManyToOne(() => PermisoOrmEntity, { nullable: false, onDelete: 'CASCADE' })
  @JoinColumn({ name: 'permiso_id' })
  permiso: PermisoOrmEntity;

  @CreateDateColumn({ name: 'creado_en' })
  creadoEn: Date;

  @UpdateDateColumn({ name: 'actualizado_en' })
  actualizadoEn: Date;
}
