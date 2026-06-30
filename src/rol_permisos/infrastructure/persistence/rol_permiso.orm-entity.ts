import { CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, Unique, UpdateDateColumn } from 'typeorm';
import { RoleOrmEntity } from 'src/roles/infrastructure/persistence/role.orm-entity';
import { PermisoOrmEntity } from 'src/permisos/infrastructure/persistence/permiso.orm-entity';

@Entity('rol_permisos')
@Unique('UQ_rol_permiso', ['role', 'permiso'])
export class Rol_permisoOrmEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => RoleOrmEntity, (role) => role.rolPermisos, { nullable: false, onDelete: 'CASCADE' })
  @JoinColumn({ name: 'rol_id' })
  role: RoleOrmEntity;

  @ManyToOne(() => PermisoOrmEntity, (permiso) => permiso.rolPermisos, { nullable: false, onDelete: 'CASCADE' })
  @JoinColumn({ name: 'permiso_id' })
  permiso: PermisoOrmEntity;

  @CreateDateColumn({ name: 'creado_en' })
  creadoEn: Date;

  @UpdateDateColumn({ name: 'actualizado_en' })
  actualizadoEn: Date;
}
