import { Column, CreateDateColumn, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { PrestamoEstado } from '../../domain/prestamo-estado.enum';
import { UsuarioOrmEntity } from 'src/usuarios/infrastructure/persistence/usuario.orm-entity';
import { FichaOrmEntity } from 'src/fichas/infrastructure/persistence/ficha.orm-entity';
import { Material_itemOrmEntity } from 'src/material_item/infrastructure/persistence/material_item.orm-entity';
import { PrestamoMaterialConsumibleOrmEntity } from './prestamo-material-consumible.orm-entity';

@Entity('prestamos')
export class PrestamoOrmEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'text', nullable: false })
  motivo: string;

  @Column({ type: 'text', nullable: true })
  observacion: string;

  @Column({ type: 'date', default: () => 'CURRENT_DATE', name: 'fecha_registro' })
  fechaRegistro: Date;

  @Column({ type: 'date', name: 'fecha_inicio' })
  fechaInicio: Date;

  @Column({ type: 'date', name: 'fecha_fin' })
  fechaFin: Date;

  @Column({ type: 'enum', enum: PrestamoEstado, default: PrestamoEstado.PENDIENTE })
  estado: PrestamoEstado;

  @ManyToOne(() => UsuarioOrmEntity, { nullable: false, onDelete: 'RESTRICT' })
  @JoinColumn({ name: 'usuario_id' })
  usuario: UsuarioOrmEntity;

  @ManyToOne(() => FichaOrmEntity, { nullable: false, onDelete: 'RESTRICT' })
  @JoinColumn({ name: 'ficha_id' })
  ficha: FichaOrmEntity;

  @ManyToMany(() => UsuarioOrmEntity)
  @JoinTable({
    name: 'prestamo_beneficiario',
    joinColumn: { name: 'prestamo_id' },
    inverseJoinColumn: { name: 'usuario_id' },
  })
  beneficiarios: UsuarioOrmEntity[];

  @ManyToMany(() => Material_itemOrmEntity)
  @JoinTable({
    name: 'prestamo_material_item',
    joinColumn: { name: 'prestamo_id' },
    inverseJoinColumn: { name: 'material_item_id' },
  })
  materialItems: Material_itemOrmEntity[];

  @OneToMany(() => PrestamoMaterialConsumibleOrmEntity, (pmc) => pmc.prestamo, { cascade: true })
  materialConsumibles: PrestamoMaterialConsumibleOrmEntity[];

  @ManyToOne(() => UsuarioOrmEntity, { nullable: true, onDelete: 'RESTRICT' })
  @JoinColumn({ name: 'aprobado_por_id' })
  aprobadoPor: UsuarioOrmEntity;

  @Column({ type: 'timestamp', nullable: true, name: 'fecha_aprobacion' })
  fechaAprobacion: Date;

  @ManyToOne(() => UsuarioOrmEntity, { nullable: true, onDelete: 'RESTRICT' })
  @JoinColumn({ name: 'rechazado_por_id' })
  rechazadoPor: UsuarioOrmEntity;

  @Column({ type: 'timestamp', nullable: true, name: 'fecha_rechazo' })
  fechaRechazo: Date;

  @Column({ type: 'timestamp', nullable: true, name: 'fecha_entrega' })
  fechaEntrega: Date;

  @Column({ type: 'timestamp', nullable: true, name: 'fecha_devolucion' })
  fechaDevolucion: Date;

  @CreateDateColumn({ name: 'creado_en' })
  creadoEn: Date;

  @UpdateDateColumn({ name: 'actualizado_en' })
  actualizadoEn: Date;
}
