import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('permiso')
export class PermisoOrmEntity {
  @PrimaryGeneratedColumn({ name: 'ID_Permiso' })
  id!: number;

  @Column({ name: 'Nombre', type: 'varchar', length: 255 })
  nombre!: string;
}
