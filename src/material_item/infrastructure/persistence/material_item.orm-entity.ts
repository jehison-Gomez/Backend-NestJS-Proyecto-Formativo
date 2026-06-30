import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { Material_itemEstado } from '../../domain/material_item-estado.enum';
import { Material_itemEstadoItem } from '../../domain/material_item-estado_item';
import { MaterialeOrmEntity } from 'src/materiales/infrastructure/persistence/materiale.orm-entity';
import { UbicacionOrmEntity } from 'src/ubicacion/infrastructure/persistence/ubicacion.orm-entity';

@Entity('material_item')
export class Material_itemOrmEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 100, unique: true, name: 'codigo_sena' })
  codigoSena: string;

  @Column({ type: 'varchar', length: 255 })
  condicion: string;

  @Column({ type: 'text', nullable: true })
  observacion: string;

  @Column({ type: 'enum', enum: Material_itemEstadoItem, default: Material_itemEstadoItem.BUENO, name: 'estado_item' })
  estadoItem: Material_itemEstadoItem;

  @Column({ type: 'enum', enum: Material_itemEstado, default: Material_itemEstado.DISPONIBLE })
  estado: Material_itemEstado;

  @ManyToOne(() => MaterialeOrmEntity, { nullable: false, onDelete: 'RESTRICT' })
  @JoinColumn({ name: 'materiale_id' })
  materiale: MaterialeOrmEntity;

  @ManyToOne(() => UbicacionOrmEntity, { nullable: true, onDelete: 'RESTRICT' })
  @JoinColumn({ name: 'ubicacion_id' })
  ubicacion: UbicacionOrmEntity | null;

  @CreateDateColumn({ name: 'creado_en' })
  creadoEn: Date;

  @UpdateDateColumn({ name: 'actualizado_en' })
  actualizadoEn: Date;
}
