import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('rol')
export class RolOrmEntity {
  @PrimaryGeneratedColumn({ name: 'ID_Rol' })
  id: number;

  @Column({ name: 'Nombre', type: 'varchar', length: 255 })
  nombre: string;
}
