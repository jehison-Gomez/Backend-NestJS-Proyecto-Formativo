import { Column, Entity, PrimaryGeneratedColumn, BeforeInsert, BeforeUpdate, OneToMany } from 'typeorm';
import { RolPermisoOrmEntity } from 'src/rol_permisos/infrastructure/persistence/rol_permiso.orm-entity';

@Entity('permisos')
export class PermisoOrmEntity {

  @PrimaryGeneratedColumn('uuid')
  id_permiso: string;

  @Column('text', { unique: true })
  nombre: string;

  @Column('text', { unique: true })
  descripcion: string;

  @Column('text')
  modulo: string;

  @Column('text')
  accion: string;

  @Column('text')
  activo: string;

  @OneToMany(() => RolPermisoOrmEntity, (rp) => rp.permiso)
  rol_permisos: RolPermisoOrmEntity[];

  @BeforeInsert()
  @BeforeUpdate()
  checkFields() {
    this.nombre = this.nombre.trim().toLowerCase();
    this.descripcion = this.descripcion.trim().toLowerCase();
  }
}