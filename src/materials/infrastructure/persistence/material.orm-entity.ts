import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('material')
export class MaterialOrmEntity {
  @PrimaryGeneratedColumn()
  id_material: number;

  @Column({ length: 30 })
  codigo: string;

  @Column({ length: 100 })
  nombre: string;

  @Column('text')
  descripcion: string;

  @Column({ length: 20 })
  unidadMedida: string;

  @Column('int')
  cantidadDisponible: number;

  @Column('int')
  cantidadMinima: number;

  @Column({ length: 20 })
  estado: string;

  @Column({ length: 50 })
  tipo: string;

  @Column('int')
  id_area: number;

  @Column('int')
  id_ficha: number;
}
