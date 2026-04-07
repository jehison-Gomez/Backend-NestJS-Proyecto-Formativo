import { BeforeInsert, BeforeUpdate, Column, Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { AreaOrmEntity } from 'src/areas/infrastructure/persistence/area.orm-entity';

@Entity('programs')
export class ProgramOrmEntity {

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('text', { unique: true })
  name: string;

  @Column('text')
  description: string;

  @Column('uuid')
  area_id: string;

  @ManyToOne(() => AreaOrmEntity, (area) => area.programs, {
    nullable: false,
    onDelete: 'RESTRICT',
  })
  @JoinColumn({ name: 'area_id' })
  area: AreaOrmEntity;

  @BeforeInsert()
  @BeforeUpdate()
  checkFields() {
    this.name = this.name.trim().toLowerCase();
    this.description = this.description.trim();
  }
}