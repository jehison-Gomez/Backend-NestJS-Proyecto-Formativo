import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { Prestamo_materialEstado } from '../../domain/prestamo_material-estado.enum';
import { PrestamoOrmEntity } from 'src/prestamos/infrastructure/persistence/prestamo.orm-entity';
import { MaterialeOrmEntity } from 'src/materiales/infrastructure/persistence/materiale.orm-entity';
import { DevolucioneOrmEntity } from 'src/devoluciones/infrastructure/persistence/devolucione.orm-entity';

@Entity('prestamo_material')
export class Prestamo_materialOrmEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  cantidad: number;

  @Column({ type: 'enum', enum: Prestamo_materialEstado, default: Prestamo_materialEstado.ACTIVO })
  estado: Prestamo_materialEstado;

  @ManyToOne(() => PrestamoOrmEntity, { nullable: false, onDelete: 'RESTRICT' })
  @JoinColumn({ name: 'prestamo_id' })
  prestamo: PrestamoOrmEntity;

  @ManyToOne(() => MaterialeOrmEntity, { nullable: false, onDelete: 'RESTRICT' })
  @JoinColumn({ name: 'material_id' })
  material: MaterialeOrmEntity;

  @OneToOne(() => DevolucioneOrmEntity, { nullable: true, onDelete: 'SET NULL' })
  @JoinColumn({ name: 'devolucion_id' })
  devolucion: DevolucioneOrmEntity | null;

  @CreateDateColumn({ name: 'creado_en' })
  creadoEn: Date;

  @UpdateDateColumn({ name: 'actualizado_en' })
  actualizadoEn: Date;
}
