import { BeforeInsert, BeforeUpdate, Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { RoleEstado } from '../../domain/role-estado.enum';
import { UsuarioOrmEntity } from 'src/usuarios/infrastructure/persistence/usuario.orm-entity';
import { Rol_permisoOrmEntity } from 'src/rol_permisos/infrastructure/persistence/rol_permiso.orm-entity';

@Entity('roles')
export class RoleOrmEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 255, unique: true })
  nombre: string;

  @Column({ type: 'text' })
  descripcion: string;

  @Column({ type: 'int', name: 'nivel_acceso' })
  nivelAcceso: number;

  @Column({ type: 'enum', enum: RoleEstado, default: RoleEstado.ACTIVO })
  estado: RoleEstado;

  @OneToMany(() => UsuarioOrmEntity, (usuario) => usuario.role)
  usuarios: UsuarioOrmEntity[];

  @OneToMany(() => Rol_permisoOrmEntity, (rp) => rp.role)
  rolPermisos: Rol_permisoOrmEntity[];

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
