import { Column, Entity, PrimaryGeneratedColumn, BeforeInsert, BeforeUpdate, OneToMany } from 'typeorm';
import { UsuarioOrmEntity } from 'src/usuarios/infrastructure/persistence/usuario.orm-entity';
import { RolPermisoOrmEntity } from 'src/rol_permisos/infrastructure/persistence/rol_permiso.orm-entity';

@Entity('rol')
export class RolOrmEntity {

  @PrimaryGeneratedColumn('uuid')
  id_rol: string;

  @Column('text', { unique: true })
  nombre: string;

  @Column({ type: 'text', nullable: true })
  descripcion: string;

  @Column({ type: 'int', nullable: true })
  nivel_acceso: number;

  @Column({ type: 'boolean', nullable: true })
  activo: boolean;

  @OneToMany(() => UsuarioOrmEntity, (usuario) => usuario.rol)
  usuarios: UsuarioOrmEntity[];

  @OneToMany(() => RolPermisoOrmEntity, (rp) => rp.rol)
  rol_permisos: RolPermisoOrmEntity[];

  @BeforeInsert()
  @BeforeUpdate()
  checkFields() {
    this.nombre = this.nombre.trim().toLowerCase();
  }
}
