import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('rol_permisos')
export class RolPermisoOrmEntity {
  
  @PrimaryGeneratedColumn('uuid')
    id_rol_permiso: string;

  @Column('text')
  id_rol: string;

  @Column('text')
  id_permiso: string;
}