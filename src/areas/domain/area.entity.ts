import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity('areas') // Esto le dice a MySQL que cree una tabla llamada 'areas'
export class Area {
  @PrimaryColumn({ type: 'varchar', length: 50 })
  id: string;

  @Column({ type: 'varchar', length: 150, unique: true })
  name: string;

  @Column({ type: 'varchar', length: 50 })
  site_id: string;
}
