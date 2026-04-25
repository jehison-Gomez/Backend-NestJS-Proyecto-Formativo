import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { SedeOrmEntity } from './sede.orm-entity';

@Entity('area')
export class AreaOrmEntity {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id_area' })
  id!: number;

  @Column({ name: 'nombre', type: 'varchar', length: 100 })
  nombre!: string;

  @Column({ name: 'descripcion', type: 'text' })
  descripcion!: string;

  @Column({ name: 'estado', type: 'boolean', default: true })
  estado!: boolean;

  @Column({ name: 'id_sede', type: 'int', nullable: true })
  sedeId?: number;

  @Column({ name: 'id_usuario_encargado', type: 'int', nullable: true })
  usuarioEncargadoId?: number;

  @ManyToOne(() => SedeOrmEntity, (sede) => sede.areas, {
    nullable: true,
  })
  @JoinColumn({ name: 'id_sede' })
  sede?: SedeOrmEntity;
}