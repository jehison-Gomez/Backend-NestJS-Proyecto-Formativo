import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { MunicipioOrmEntity } from './municipio.orm-entity';
import { SedeOrmEntity } from './sede.orm-entity';

@Entity('centro')
export class CentroOrmEntity {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id_centro' })
  id!: number;

  @Column({ name: 'nombre', type: 'varchar', length: 100 })
  nombre!: string;

  @Column({ name: 'codigo', type: 'varchar', length: 20 })
  codigo!: string;

  @Column({ name: 'direccion', type: 'varchar', length: 200 })
  direccion!: string;

  @Column({ name: 'estado', type: 'boolean', default: true })
  estado!: boolean;

  @Column({ name: 'id_municipio', type: 'int', nullable: true })
  municipioId?: number;

  @ManyToOne(() => MunicipioOrmEntity, (municipio) => municipio.centros, {
    nullable: true,
  })
  @JoinColumn({ name: 'id_municipio' })
  municipio?: MunicipioOrmEntity;

  @OneToMany(() => SedeOrmEntity, (sede) => sede.centro)
  sedes?: SedeOrmEntity[];
}