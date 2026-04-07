import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('rol_permiso')
export class RolPermisoOrmEntity {
  @PrimaryGeneratedColumn({ name: 'ID_Rol_Permiso' })
  id: number;

  @Column({ name: 'FK_ID_Permiso', type: 'int' })
  permisoId: number;

  @Column({ name: 'FK_ID_Rol', type: 'int' })
  rolId: number;
}
