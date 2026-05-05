import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { SedeOrmEntity } from '../../../sede/infrastructure/persistence/sede.orm-entity';

@Entity('area')
export class AreaOrmEntity {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id_area' })
  id_area!: number;

  @Column({ type: 'varchar', length: 100 })
  nombre!: string;

  @Column({ type: 'text' })
  descripcion!: string;

  @Column({ type: 'boolean', default: true })
  estado!: boolean;

  @Column({ name: 'id_sede', type: 'int', nullable: true })
  id_sede?: number;

  @Column({ name: 'id_usuario_encargado', type: 'int', nullable: true })
  id_usuario_encargado?: number;

  @ManyToOne(() => SedeOrmEntity, { nullable: true })
  @JoinColumn({ name: 'id_sede' })
  sede?: SedeOrmEntity;
}
