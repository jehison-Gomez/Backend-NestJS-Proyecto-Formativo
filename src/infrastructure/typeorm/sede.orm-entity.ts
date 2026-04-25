import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { CentroOrmEntity } from './centro.orm-entity';
import { AreaOrmEntity } from './area.orm-entity';

@Entity('sede')
export class SedeOrmEntity {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id_sede' })
  id!: number;

  @Column({ name: 'nombre', type: 'varchar', length: 100 })
  nombre!: string;

  @Column({ name: 'direccion', type: 'varchar', length: 200 })
  direccion!: string;

  @Column({ name: 'estado', type: 'boolean', default: true })
  estado!: boolean;

  @Column({ name: 'id_centro', type: 'int', nullable: true })
  centroId?: number;

  @ManyToOne(() => CentroOrmEntity, (centro) => centro.sedes, {
    nullable: true,
  })
  @JoinColumn({ name: 'id_centro' })
  centro?: CentroOrmEntity;

  @OneToMany(() => AreaOrmEntity, (area) => area.sede)
  areas?: AreaOrmEntity[];
}