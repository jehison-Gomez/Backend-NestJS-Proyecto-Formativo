import { BeforeInsert, BeforeUpdate, Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { UbicacionEstado } from '../../domain/ubicacion-estado.enum';
import { Tipo_ubicacionOrmEntity } from 'src/tipo_ubicacion/infrastructure/persistence/tipo_ubicacion.orm-entity';
import { AreaOrmEntity } from 'src/areas/infrastructure/persistence/area.orm-entity';

@Entity('ubicacion')
export class UbicacionOrmEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 255, unique: true })
  nombre: string;

  @Column({ type: 'varchar', length: 255 })
  descripcion: string;

  @Column({ type: 'enum', enum: UbicacionEstado, default: UbicacionEstado.ACTIVO })
  estado: UbicacionEstado;

  @ManyToOne(() => Tipo_ubicacionOrmEntity, (tu) => tu.ubicaciones, {
    nullable: false,
    onDelete: 'RESTRICT',
  })
  @JoinColumn({ name: 'tipo_ubicacion_id' })
  tipoUbicacion: Tipo_ubicacionOrmEntity;

  @ManyToOne(() => AreaOrmEntity, (area) => area.ubicaciones, {
    nullable: false,
    onDelete: 'RESTRICT',
  })
  @JoinColumn({ name: 'area_id' })
  area: AreaOrmEntity;

  @CreateDateColumn({ name: 'creado_en' })
  creadoEn: Date;

  @UpdateDateColumn({ name: 'actualizado_en' })
  actualizadoEn: Date;

  @BeforeInsert()
  @BeforeUpdate()
  checkFields() {
    this.nombre = this.nombre.trim().toLowerCase();
  }
}
