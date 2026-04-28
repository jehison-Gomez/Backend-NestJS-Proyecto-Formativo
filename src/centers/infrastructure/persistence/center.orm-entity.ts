import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { DepartmentOrmEntity } from 'src/departments/infrastructure/persistence/departamento.orm-entity';
import { SiteOrmEntity } from 'src/sites/infrastructure/persistence/site.orm-entity';

@Entity('centers')
export class CenterOrmEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 50, unique: true })
  center_code: string;

  @Column({ type: 'varchar', length: 150, unique: true })
  name: string;

  @Column({ type: 'varchar', length: 255 })
  address: string;

  @Column('uuid')
  department_id: string;

  @ManyToOne(() => DepartmentOrmEntity, (department) => department.centers, {
    nullable: false,
    onDelete: 'RESTRICT',
  })
  @JoinColumn({ name: 'department_id' })
  department: DepartmentOrmEntity;

  @OneToMany(() => SiteOrmEntity, (site) => site.center)
  sites: SiteOrmEntity[];

  @BeforeInsert()
  @BeforeUpdate()
  checkName() {
    if (this.name) {
      this.name = this.name.trim().toLowerCase();
    }
  }
}