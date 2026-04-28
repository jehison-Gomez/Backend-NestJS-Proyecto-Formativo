import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('ubicacion')
export class UbicacionOrmEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 30 })
  codigo: string;

  @Column({ length: 100 })
  nombre: string;

  @Column('text')
  descripcion: string;

  @Column('int')
  capacidad: number;

  @Column('boolean')
  estado: boolean;

  @Column('int')
  id_tipo_ubicacion: number;
}
