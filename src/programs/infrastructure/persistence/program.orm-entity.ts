import { Column, Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { AreaOrmEntity } from '../../../areas/infrastructure/persistence/area.orm-entity';

@Entity('programs')
export class ProgramOrmEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 150, unique: true }) // Corregido para evitar error de MySQL
  name: string;

  @Column({ type: 'text' })
  description: string;

  // ESTO ES LO QUE FALTA:
  @ManyToOne(() => AreaOrmEntity, (area) => area.programs)
  @JoinColumn({ name: 'area_id' }) // Esto vincula la columna física
  area: AreaOrmEntity;

  @Column()
  area_id: string;
}