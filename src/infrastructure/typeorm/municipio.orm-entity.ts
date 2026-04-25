import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { DepartamentoOrmEntity } from './departamento.orm-entity';
import { CentroOrmEntity } from './centro.orm-entity';

@Entity('municipio')
export class MunicipioOrmEntity {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id_municipio' })
  id!: number;

  @Column({ name: 'nombre', type: 'varchar', length: 100 })
  nombre!: string;

  @Column({ name: 'codigo', type: 'varchar', length: 20 })
  codigo!: string;

  @Column({ name: 'estado', type: 'boolean', default: true })
  estado!: boolean;

  @Column({ name: 'id_departamento', type: 'int', nullable: true })
  departamentoId?: number;

  @ManyToOne(() => DepartamentoOrmEntity, (departamento) => departamento.municipios, {
    nullable: true,
  })
  @JoinColumn({ name: 'id_departamento' })
  departamento?: DepartamentoOrmEntity;

  @OneToMany(() => CentroOrmEntity, (centro) => centro.municipio)
  centros?: CentroOrmEntity[];
}