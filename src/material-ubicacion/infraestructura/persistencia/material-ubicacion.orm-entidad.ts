import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
@Entity('Material_Ubicacion')
export class MaterialUbicacionOrmEntidad {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ name: 'Material_ID', type: 'int' })
  materialId: number;
  @Column({ name: 'Ubicacion_ID', type: 'int' })
  ubicacionId: number;
}