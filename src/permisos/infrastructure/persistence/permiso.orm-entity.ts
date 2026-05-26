import { BeforeInsert, BeforeUpdate, Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { PermisoEstado } from '../../domain/permiso-estado.enum';
import { Rol_permisoOrmEntity } from 'src/rol_permisos/infrastructure/persistence/rol_permiso.orm-entity';

@Entity('permisos')
export class PermisoOrmEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 255, unique: true })
  nombre: string;

  @Column({ type: 'text' })
  descripcion: string;

  @Column({ type: 'varchar', length: 100 })
  modulo: string;

  @Column({ type: 'varchar', length: 100 })
  accion: string;

  @Column({ type: 'enum', enum: PermisoEstado, default: PermisoEstado.ACTIVO })
  estado: PermisoEstado;

  @OneToMany(() => Rol_permisoOrmEntity, (rp) => rp.permiso)
  rolPermisos: Rol_permisoOrmEntity[];

  @CreateDateColumn({ name: 'creado_en' })
  creadoEn: Date;

  @UpdateDateColumn({ name: 'actualizado_en' })
  actualizadoEn: Date;

  @BeforeInsert()
  @BeforeUpdate()
  checkFields() {
    this.nombre = this.nombre.trim().toLowerCase();
    this.modulo = this.modulo.trim().toLowerCase();
    this.accion = this.accion.trim().toLowerCase();
  }
}
