import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('departamento')
export class DepartamentoOrmEntity {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id_departamento' })
  id_departamento!: number;

  @Column({ type: 'varchar', length: 100 })
  nombre!: string;

  @Column({ type: 'varchar', length: 20 })
  codigo!: string;

  @Column({ type: 'boolean', default: true })
  estado!: boolean;
}
