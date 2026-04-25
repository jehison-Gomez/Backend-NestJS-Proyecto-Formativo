import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { MunicipioOrmEntity } from './municipio.orm-entity';

@Entity('departamento')
export class DepartamentoOrmEntity {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id_departamento' })
  id!: number;

  @Column({ name: 'nombre', type: 'varchar', length: 100 })
  nombre!: string;

  @Column({ name: 'codigo', type: 'varchar', length: 20 })
  codigo!: string;

  @Column({ name: 'estado', type: 'boolean', default: true })
  estado!: boolean;

  @OneToMany(() => MunicipioOrmEntity, (municipio) => municipio.departamento)
  municipios?: MunicipioOrmEntity[];
}