import { RegionOrmEntity } from 'src/regions/infrastructure/persistence/region.orm-entity';
import { CenterOrmEntity } from 'src/centers/infrastructure/persistence/center.orm-entity';
import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('departments')
export class DepartmentOrmEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  // CORREGIDO: De 'text' a 'varchar' para permitir el unique
  @Column({ type: 'varchar', length: 150, unique: true })
  name: string;

  @Column('uuid')
  region_id: string;

  @ManyToOne(() => RegionOrmEntity, (region) => region.departments, {
    nullable: false,
    onDelete: 'RESTRICT',
  })
  @JoinColumn({ name: 'region_id' })
  region: RegionOrmEntity;

  @OneToMany(() => CenterOrmEntity, (center) => center.department)
  centers: CenterOrmEntity[];

  @BeforeInsert()
  @BeforeUpdate()
  checkName() {
    if (this.name) {
      this.name = this.name.trim().toLowerCase();
    }
  }
}