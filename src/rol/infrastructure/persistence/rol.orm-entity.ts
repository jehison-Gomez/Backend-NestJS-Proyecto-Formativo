import { Column, Entity, PrimaryGeneratedColumn, BeforeInsert, BeforeUpdate, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { UsuarioOrmEntity } from 'src/usuarios/infrastructure/persistence/usuario.orm-entity';
import { RolPermisoOrmEntity } from 'src/rol_permisos/infrastructure/persistence/rol_permiso.orm-entity';

@Entity('rol')
export class RolOrmEntity {

  @PrimaryGeneratedColumn('uuid')
  id_rol: string;

  @Column('text', { unique: true })
  nombre: string;

  @Column('text', { unique: true })
  descripcion: string;

  @Column('text')
  nivel_acceso: string;

  @Column('text')
  activo: string;

  @ManyToOne(() => UsuarioOrmEntity, (usuario) => usuario.roles, { nullable: false })
  @JoinColumn({ name: 'id_usuario' })
  usuario: UsuarioOrmEntity;

  @OneToMany(() => RolPermisoOrmEntity, (rp) => rp.rol)
  rol_permisos: RolPermisoOrmEntity[];

  @BeforeInsert()
  @BeforeUpdate()
  checkFields() {
    this.nombre = this.nombre.trim().toLowerCase();
    this.descripcion = this.descripcion.trim().toLowerCase();
  }
}