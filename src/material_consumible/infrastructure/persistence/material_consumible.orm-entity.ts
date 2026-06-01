import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { Material_consumibleEstado } from '../../domain/material_consumible-estado.enum';
import { MaterialeOrmEntity } from 'src/materiales/infrastructure/persistence/materiale.orm-entity';

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

  @ManyToOne(() => MaterialeOrmEntity, { nullable: false, onDelete: 'RESTRICT' })
  @JoinColumn({ name: 'materiale_id' })
  materiale: MaterialeOrmEntity;

  @CreateDateColumn({ name: 'creado_en' })
  creadoEn: Date;

  @UpdateDateColumn({ name: 'actualizado_en' })
  actualizadoEn: Date;
}
