import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, Unique, UpdateDateColumn } from 'typeorm';
import { PrestamoConsumibleEstado } from '../../domain/prestamo_consumible-estado.enum';
import { PrestamoOrmEntity } from 'src/prestamos/infrastructure/persistence/prestamo.orm-entity';
import { Material_consumibleOrmEntity } from 'src/material_consumible/infrastructure/persistence/material_consumible.orm-entity';

@Entity('prestamo_consumible')
@Unique('UQ_prestamo_consumible', ['prestamo', 'materialConsumible'])
export class PrestamoConsumibleOrmEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => PrestamoOrmEntity, { nullable: false, onDelete: 'CASCADE' })
  @JoinColumn({ name: 'prestamo_id' })
  prestamo: PrestamoOrmEntity;

  @ManyToOne(() => Material_consumibleOrmEntity, { nullable: false, onDelete: 'RESTRICT' })
  @JoinColumn({ name: 'material_consumible_id' })
  materialConsumible: Material_consumibleOrmEntity;

  @Column({ type: 'decimal', precision: 10, scale: 2, name: 'cantidad_solicitada' })
  cantidadSolicitada: number;

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true, name: 'cantidad_aprobada' })
  cantidadAprobada: number | null;

  @Column({ type: 'varchar', length: 255, nullable: true })
  observacion: string | null;

  @Column({ type: 'enum', enum: PrestamoConsumibleEstado, default: PrestamoConsumibleEstado.PENDIENTE })
  estado: PrestamoConsumibleEstado;

  @CreateDateColumn({ name: 'creado_en' })
  creadoEn: Date;

  @UpdateDateColumn({ name: 'actualizado_en' })
  actualizadoEn: Date;
}
