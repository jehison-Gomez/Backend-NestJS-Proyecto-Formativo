import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { CenterOrmEntity } from 'src/centers/infrastructure/persistence/center.orm-entity';
import { AreaOrmEntity } from 'src/areas/infrastructure/persistence/area.orm-entity';

@Entity('sites')
export class SiteOrmEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 150 })
  name: string;

  @Column('uuid')
  center_id: string;

  @Column({ type: 'varchar', length: 255 })
  address: string;

  @ManyToOne(() => CenterOrmEntity, (center) => center.sites, {
    nullable: false,
    onDelete: 'RESTRICT',
  })
  @JoinColumn({ name: 'center_id' })
  center: CenterOrmEntity;

  @OneToMany(() => AreaOrmEntity, (area) => area.site)
  areas: AreaOrmEntity[];
}