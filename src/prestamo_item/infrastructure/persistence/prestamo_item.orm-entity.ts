import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, Unique, UpdateDateColumn } from 'typeorm';
import { PrestamoItemEstado } from '../../domain/prestamo_item-estado.enum';
import { PrestamoOrmEntity } from 'src/prestamos/infrastructure/persistence/prestamo.orm-entity';
import { Material_itemOrmEntity } from 'src/material_item/infrastructure/persistence/material_item.orm-entity';

@Entity('prestamo_item')
@Unique('UQ_prestamo_material_item', ['prestamo', 'materialItem'])
export class PrestamoItemOrmEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => PrestamoOrmEntity, { nullable: false, onDelete: 'CASCADE' })
  @JoinColumn({ name: 'prestamo_id' })
  prestamo: PrestamoOrmEntity;

  @ManyToOne(() => Material_itemOrmEntity, { nullable: false, onDelete: 'RESTRICT' })
  @JoinColumn({ name: 'material_item_id' })
  materialItem: Material_itemOrmEntity;

  @Column({ type: 'boolean', default: true, name: 'incluido_en_aprobacion' })
  incluidoEnAprobacion: boolean;

  @Column({ type: 'varchar', length: 255, nullable: true })
  observacion: string | null;

  @Column({ type: 'enum', enum: PrestamoItemEstado, default: PrestamoItemEstado.PENDIENTE })
  estado: PrestamoItemEstado;

  @CreateDateColumn({ name: 'creado_en' })
  creadoEn: Date;

  @UpdateDateColumn({ name: 'actualizado_en' })
  actualizadoEn: Date;
}
