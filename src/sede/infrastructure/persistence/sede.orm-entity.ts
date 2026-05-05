import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { CentroOrmEntity } from '../../../centro/infrastructure/persistence/centro.orm-entity';

@Entity('sede')
export class SedeOrmEntity {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id_sede' })
  id_sede!: number;

  @Column({ type: 'varchar', length: 100 })
  nombre!: string;

  @Column({ type: 'varchar', length: 200 })
  direccion!: string;

  @Column({ type: 'boolean', default: true })
  estado!: boolean;

  @Column({ name: 'id_centro', type: 'int', nullable: true })
  id_centro?: number;

  @ManyToOne(() => CentroOrmEntity, { nullable: true })
  @JoinColumn({ name: 'id_centro' })
  centro?: CentroOrmEntity;
}
