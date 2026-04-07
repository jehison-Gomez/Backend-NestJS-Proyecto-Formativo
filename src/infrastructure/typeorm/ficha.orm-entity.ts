import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('Ficha')
export class FichaOrmEntity {
  @PrimaryGeneratedColumn({ name: 'ID_Ficha' })
  id!: number;

  @Column({ name: 'Numero_Ficha', type: 'varchar', length: 255 })
  numeroFicha!: string;

  @Column({ name: 'FK_ID_Programa', type: 'int' })
  programaId!: number;

  @Column({ name: 'FK_ID_Instructor', type: 'int' })
  instructorId!: number;
}
