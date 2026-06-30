import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { MovimientoEstado } from '../../domain/movimiento-estado.enum';
import { MovimientoTipo } from '../../domain/movimiento-tipo.enum';
import { PrestamoOrmEntity } from 'src/prestamos/infrastructure/persistence/prestamo.orm-entity';
import { Material_itemOrmEntity } from 'src/material_item/infrastructure/persistence/material_item.orm-entity';
import { Material_consumibleOrmEntity } from 'src/material_consumible/infrastructure/persistence/material_consumible.orm-entity';
import { UsuarioOrmEntity } from 'src/usuarios/infrastructure/persistence/usuario.orm-entity';
import { DevolucioneOrmEntity } from 'src/devoluciones/infrastructure/persistence/devolucione.orm-entity';

@Entity('movimientos')
export class MovimientoOrmEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'enum', enum: MovimientoTipo })
  tipo: MovimientoTipo;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  cantidad: number;

  @Column({ type: 'text' })
  descripcion: string;

  @Column({ type: 'enum', enum: MovimientoEstado, default: MovimientoEstado.ACTIVO })
  estado: MovimientoEstado;

  @ManyToOne(() => PrestamoOrmEntity, { nullable: true, onDelete: 'RESTRICT' })
  @JoinColumn({ name: 'prestamo_id' })
  prestamo: PrestamoOrmEntity | null;

  @ManyToOne(() => DevolucioneOrmEntity, { nullable: true, onDelete: 'RESTRICT' })
  @JoinColumn({ name: 'devolucion_id' })
  devolucion: DevolucioneOrmEntity | null;

  @ManyToOne(() => Material_itemOrmEntity, { nullable: true, onDelete: 'RESTRICT' })
  @JoinColumn({ name: 'material_item_id' })
  materialItem: Material_itemOrmEntity | null;

  @ManyToOne(() => Material_consumibleOrmEntity, { nullable: true, onDelete: 'RESTRICT' })
  @JoinColumn({ name: 'material_consumible_id' })
  materialConsumible: Material_consumibleOrmEntity | null;

  @ManyToOne(() => UsuarioOrmEntity, { nullable: true, onDelete: 'SET NULL' })
  @JoinColumn({ name: 'usuario_id' })
  usuario: UsuarioOrmEntity | null;

  @CreateDateColumn({ name: 'creado_en' })
  creadoEn: Date;

  @UpdateDateColumn({ name: 'actualizado_en' })
  actualizadoEn: Date;
}
