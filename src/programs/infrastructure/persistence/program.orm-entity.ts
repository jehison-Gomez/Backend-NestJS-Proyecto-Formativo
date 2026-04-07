import { BeforeInsert, BeforeUpdate, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('program')
export class ProgramOrmEntity {

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('text', { unique: true })
  name: string;

  @Column('text')
  description: string;

  @BeforeInsert()
  @BeforeUpdate()
  checkFields() {
    this.name = this.name.trim().toLowerCase();
    this.description = this.description.trim();
  }
}