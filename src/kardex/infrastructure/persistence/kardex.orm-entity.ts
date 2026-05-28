import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { KardexEstado } from '../../domain/kardex-estado.enum';
import { FichaOrmEntity } from 'src/fichas/infrastructure/persistence/ficha.orm-entity';
import { PrestamoOrmEntity } from 'src/prestamos/infrastructure/persistence/prestamo.orm-entity';
import { UsuarioOrmEntity } from 'src/usuarios/infrastructure/persistence/usuario.orm-entity';
import { MaterialeOrmEntity } from 'src/materiales/infrastructure/persistence/materiale.orm-entity';
import { UbicacionOrmEntity } from 'src/ubicacion/infrastructure/persistence/ubicacion.orm-entity';
import { MovimientoOrmEntity } from 'src/movimientos/infrastructure/persistence/movimiento.orm-entity';

@Entity('kardex')
export class KardexOrmEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  cantidad: number;

  @Column({ type: 'decimal', precision: 10, scale: 2, name: 'cantidad_anterior' })
  cantidadAnterior: number;

  @Column({ type: 'decimal', precision: 10, scale: 2, name: 'cantidad_actual' })
  cantidadActual: number;

  @Column({ type: 'enum', enum: KardexEstado, default: KardexEstado.ACTIVO })
  estado: KardexEstado;

  @ManyToOne(() => FichaOrmEntity, { nullable: false, onDelete: 'RESTRICT' })
  @JoinColumn({ name: 'ficha_id' })
  ficha: FichaOrmEntity;

  @ManyToOne(() => PrestamoOrmEntity, { nullable: false, onDelete: 'RESTRICT' })
  @JoinColumn({ name: 'prestamo_id' })
  prestamo: PrestamoOrmEntity;

  @ManyToOne(() => UsuarioOrmEntity, { nullable: false, onDelete: 'RESTRICT' })
  @JoinColumn({ name: 'usuario_id' })
  usuario: UsuarioOrmEntity;

  @ManyToOne(() => MaterialeOrmEntity, { nullable: false, onDelete: 'RESTRICT' })
  @JoinColumn({ name: 'material_id' })
  material: MaterialeOrmEntity;

  @ManyToOne(() => UbicacionOrmEntity, { nullable: false, onDelete: 'RESTRICT' })
  @JoinColumn({ name: 'ubicacion_id' })
  ubicacion: UbicacionOrmEntity;

  @ManyToOne(() => MovimientoOrmEntity, { nullable: false, onDelete: 'RESTRICT' })
  @JoinColumn({ name: 'movimiento_id' })
  movimiento: MovimientoOrmEntity;

  @CreateDateColumn({ name: 'creado_en' })
  creadoEn: Date;

  @UpdateDateColumn({ name: 'actualizado_en' })
  actualizadoEn: Date;
}
