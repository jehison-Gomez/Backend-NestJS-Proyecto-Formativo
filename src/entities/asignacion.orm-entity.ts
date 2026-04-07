import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('Asignacion')
export class Asignacion {
  @PrimaryGeneratedColumn({ name: 'ID_Asignacion' })
  id: number;

  @Column({ name: 'FK_ID_Material_Movimiento', type: 'int' })
  materialMovimientoId: number;
}
