import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne, JoinColumn } from 'typeorm';
import { ProgramOrmEntity } from '../../../programs/infrastructure/persistence/program.orm-entity';
import { SiteOrmEntity } from '../../../sites/infrastructure/persistence/site.orm-entity';
import { SpaceOrmEntity } from '../../../spaces/infrastructure/persistence/space.orm-entity';

@Entity('areas')
export class AreaOrmEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 150, unique: true })
  name: string;

  // Relación con Site (Muchos áreas pertenecen a un sitio)
  @ManyToOne(() => SiteOrmEntity, (site) => site.areas)
  @JoinColumn({ name: 'site_id' })
  site: SiteOrmEntity;

  @Column()
  site_id: string;

  // Relación con Programs (Un área tiene muchos programas)
  @OneToMany(() => ProgramOrmEntity, (program) => program.area)
  programs: ProgramOrmEntity[];

  // Relación con Spaces (Un área tiene muchos espacios)
  @OneToMany(() => SpaceOrmEntity, (space) => space.area)
  spaces: SpaceOrmEntity[];
}