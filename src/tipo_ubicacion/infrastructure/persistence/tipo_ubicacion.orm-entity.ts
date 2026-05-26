import { BeforeInsert, BeforeUpdate, Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { Tipo_ubicacionEstado } from '../../domain/tipo_ubicacion-estado.enum';
import { UbicacionOrmEntity } from 'src/ubicacion/infrastructure/persistence/ubicacion.orm-entity';

@Entity('tipo_ubicacion')
export class Tipo_ubicacionOrmEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 255, unique: true })
  nombre: string;

  @Column({ type: 'varchar', length: 255 })
  descripcion: string;

  @Column({ type: 'enum', enum: Tipo_ubicacionEstado, default: Tipo_ubicacionEstado.ACTIVO })
  estado: Tipo_ubicacionEstado;

  @OneToMany(() => UbicacionOrmEntity, (u) => u.tipoUbicacion)
  ubicaciones: UbicacionOrmEntity[];

  @CreateDateColumn({ name: 'creado_en' })
  creadoEn: Date;

  @UpdateDateColumn({ name: 'actualizado_en' })
  actualizadoEn: Date;

  @BeforeInsert()
  @BeforeUpdate()
  checkFields() {
    this.nombre = this.nombre.trim().toLowerCase();
    this.descripcion = this.descripcion.trim().toLowerCase();
  }
}
