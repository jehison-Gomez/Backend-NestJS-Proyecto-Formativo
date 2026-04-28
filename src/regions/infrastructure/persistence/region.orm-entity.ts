import { DepartmentOrmEntity } from 'src/departments/infrastructure/persistence/departamento.orm-entity';
import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('regions')
export class RegionOrmEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  // CORREGIDO: De 'text' a 'varchar' para permitir el unique
  @Column({ type: 'varchar', length: 150, unique: true })
  name: string;

  @OneToMany(() => DepartmentOrmEntity, (department) => department.region)
  departments: DepartmentOrmEntity[];

  @BeforeInsert()
  @BeforeUpdate()
  checkName() {
    if (this.name) {
      this.name = this.name.trim().toLowerCase();
    }
  }
}