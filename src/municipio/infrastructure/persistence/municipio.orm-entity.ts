import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { DepartamentoOrmEntity } from '../../../departamento/infrastructure/persistence/departamento.orm-entity';

@Entity('municipio')
export class MunicipioOrmEntity {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id_municipio' })
  id_municipio!: number;

  @Column({ type: 'varchar', length: 100 })
  nombre!: string;

  @Column({ type: 'varchar', length: 20 })
  codigo!: string;

  @Column({ type: 'boolean', default: true })
  estado!: boolean;

  @Column({ name: 'id_departamento', type: 'int', nullable: true })
  id_departamento?: number;

  @ManyToOne(() => DepartamentoOrmEntity, { nullable: true })
  @JoinColumn({ name: 'id_departamento' })
  departamento?: DepartamentoOrmEntity;
}
