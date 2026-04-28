import { Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { RolOrmEntity } from 'src/rol/infrastructure/persistence/rol.orm-entity';
import { PermisoOrmEntity } from 'src/permisos/infrastructure/persistence/permiso.orm-entity';

@Entity('rol_permisos')
export class RolPermisoOrmEntity {

  @PrimaryGeneratedColumn('uuid')
  id_rol_permiso: string;

  @ManyToOne(() => RolOrmEntity, (rol: any) => rol.rol_permisos, { nullable: false })
  @JoinColumn({ name: 'id_rol' })
  rol: RolOrmEntity;

  @ManyToOne(() => PermisoOrmEntity, (permiso: any) => permiso.rol_permisos, { nullable: false })
  @JoinColumn({ name: 'id_permiso' })
  permiso: PermisoOrmEntity;
}