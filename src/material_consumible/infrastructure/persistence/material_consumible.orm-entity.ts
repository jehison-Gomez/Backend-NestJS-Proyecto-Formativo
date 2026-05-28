import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { Material_consumibleEstado } from '../../domain/material_consumible-estado.enum';

@Entity('material_consumible')
export class Material_consumibleOrmEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  stockActual: number;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  stockMinimo: number;

  @Column({ type: 'varchar', length: 100 })
  unidadMedida: string;

  @Column({ type: 'date' })
  fechaVencimiento: Date;

  @Column({ type: 'enum', enum: Material_consumibleEstado, default: Material_consumibleEstado.ACTIVO })
  estado: Material_consumibleEstado;

  @CreateDateColumn({ name: 'creado_en' })
  creadoEn: Date;

  @UpdateDateColumn({ name: 'actualizado_en' })
  actualizadoEn: Date;
}
