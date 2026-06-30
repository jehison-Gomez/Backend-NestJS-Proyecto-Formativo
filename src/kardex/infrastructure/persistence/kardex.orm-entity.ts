import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { KardexEstado } from '../../domain/kardex-estado.enum';
import { MovimientoOrmEntity } from 'src/movimientos/infrastructure/persistence/movimiento.orm-entity';
import { FichaOrmEntity } from 'src/fichas/infrastructure/persistence/ficha.orm-entity';
import { UsuarioOrmEntity } from 'src/usuarios/infrastructure/persistence/usuario.orm-entity';
import { PrestamoOrmEntity } from 'src/prestamos/infrastructure/persistence/prestamo.orm-entity';
import { DevolucioneOrmEntity } from 'src/devoluciones/infrastructure/persistence/devolucione.orm-entity';
import { Material_consumibleOrmEntity } from 'src/material_consumible/infrastructure/persistence/material_consumible.orm-entity';
import { Material_itemOrmEntity } from 'src/material_item/infrastructure/persistence/material_item.orm-entity';

@Entity('kardex')
export class KardexOrmEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => MovimientoOrmEntity, { nullable: false, onDelete: 'RESTRICT' })
  @JoinColumn({ name: 'movimiento_id' })
  movimiento: MovimientoOrmEntity;

  @ManyToOne(() => FichaOrmEntity, { nullable: false, onDelete: 'RESTRICT' })
  @JoinColumn({ name: 'ficha_id' })
  ficha: FichaOrmEntity;

  @ManyToOne(() => UsuarioOrmEntity, { nullable: false, onDelete: 'RESTRICT' })
  @JoinColumn({ name: 'usuario_id' })
  usuario: UsuarioOrmEntity;

  @ManyToOne(() => PrestamoOrmEntity, { nullable: true, onDelete: 'RESTRICT' })
  @JoinColumn({ name: 'prestamo_id' })
  prestamo: PrestamoOrmEntity | null;

  @ManyToOne(() => DevolucioneOrmEntity, { nullable: true, onDelete: 'RESTRICT' })
  @JoinColumn({ name: 'devolucion_id' })
  devolucion: DevolucioneOrmEntity | null;

  @ManyToOne(() => Material_consumibleOrmEntity, { nullable: true, onDelete: 'RESTRICT' })
  @JoinColumn({ name: 'material_consumible_id' })
  materialConsumible: Material_consumibleOrmEntity | null;

  @ManyToOne(() => Material_itemOrmEntity, { nullable: true, onDelete: 'RESTRICT' })
  @JoinColumn({ name: 'material_item_id' })
  materialItem: Material_itemOrmEntity | null;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  cantidad: number;

  // null para items (no tienen saldo acumulado)
  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true, name: 'saldo_anterior' })
  saldoAnterior: number | null;

  // null para items
  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true, name: 'saldo_actual' })
  saldoActual: number | null;

  @Column({ type: 'enum', enum: KardexEstado, default: KardexEstado.ACTIVO })
  estado: KardexEstado;

  @CreateDateColumn({ name: 'creado_en' })
  creadoEn: Date;

  @UpdateDateColumn({ name: 'actualizado_en' })
  actualizadoEn: Date;
}
