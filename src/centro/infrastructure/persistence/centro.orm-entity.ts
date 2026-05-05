import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { MunicipioOrmEntity } from '../../../municipio/infrastructure/persistence/municipio.orm-entity';

@Entity('centro')
export class CentroOrmEntity {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id_centro' })
  id_centro!: number;

  @Column({ type: 'varchar', length: 100 })
  nombre!: string;

  @Column({ type: 'varchar', length: 20 })
  codigo!: string;

  @Column({ type: 'varchar', length: 200 })
  direccion!: string;

  @Column({ type: 'boolean', default: true })
  estado!: boolean;

  @Column({ name: 'id_municipio', type: 'int', nullable: true })
  id_municipio?: number;

  @ManyToOne(() => MunicipioOrmEntity, { nullable: true })
  @JoinColumn({ name: 'id_municipio' })
  municipio?: MunicipioOrmEntity;
}
