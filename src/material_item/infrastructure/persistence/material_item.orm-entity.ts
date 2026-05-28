import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { Material_itemEstado } from '../../domain/material_item-estado.enum';
import { Material_itemEstadoItem } from '../../domain/material_item-estado_item';

@Entity('material_item')
export class Material_itemOrmEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 100, unique: true })
  codigoSena: string;

  @Column({ type: 'varchar', length: 255 })
  condicion: string;

  @Column({ type: 'text', nullable: true })
  observacion: string;

  @Column({ type: 'enum', enum: Material_itemEstadoItem, default: Material_itemEstadoItem.BUENO })
  estadoItem: Material_itemEstadoItem;

  @Column({ type: 'enum', enum: Material_itemEstado, default: Material_itemEstado.ACTIVO })
  estado: Material_itemEstado;

  @CreateDateColumn({ name: 'creado_en' })
  creadoEn: Date;

  @UpdateDateColumn({ name: 'actualizado_en' })
  actualizadoEn: Date;
}
