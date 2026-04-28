import { SpaceType } from 'src/spaces/domain/enum';
import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  PrimaryColumn,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { AreaOrmEntity } from 'src/areas/infrastructure/persistence/area.orm-entity';

@Entity('spaces')
export class SpaceOrmEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 150, unique: true }) // Cambiado de text a varchar
  name: string;

  @Column({
    type: 'enum',
    enum: SpaceType,
  })
  type: SpaceType;

  @Column('uuid')
  area_id: string;

  @ManyToOne(() => AreaOrmEntity, (area) => area.spaces)
  @JoinColumn({ name: 'area_id' })
  area: AreaOrmEntity;

  @BeforeInsert()
  @BeforeUpdate()
  checkName() {
    this.name = this.name.trim().toLowerCase();
    // Cualquier transformacion antes de guardar
  }
}
