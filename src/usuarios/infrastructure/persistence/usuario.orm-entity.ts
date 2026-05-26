import { BeforeInsert, BeforeUpdate, Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { UsuarioEstado } from '../../domain/usuario-estado.enum';
import { FichaOrmEntity } from 'src/fichas/infrastructure/persistence/ficha.orm-entity';
import { RoleOrmEntity } from 'src/roles/infrastructure/persistence/role.orm-entity';

@Entity('usuarios')
export class UsuarioOrmEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 255 })
  nombre: string;

  @Column({ type: 'varchar', length: 255, unique: true })
  correo: string;

  @Column({ type: 'varchar', length: 255 })
  contrasena: string;

  @Column({ type: 'varchar', length: 20 })
  telefono: string;

  @Column({ type: 'varchar', length: 20, unique: true, name: 'numero_documento' })
  numeroDocumento: string;

  @Column({ type: 'enum', enum: UsuarioEstado, default: UsuarioEstado.ACTIVO })
  estado: UsuarioEstado;

  @Column({ type: 'date', default: () => 'CURRENT_DATE', name: 'fecha_registro' })
  fechaRegistro: Date;

  @ManyToOne(() => FichaOrmEntity, (ficha) => ficha.aprendices, {
    nullable: true,
    onDelete: 'RESTRICT',
  })
  @JoinColumn({ name: 'ficha_id' })
  ficha: FichaOrmEntity;

  @OneToMany(() => FichaOrmEntity, (ficha) => ficha.usuarioLider)
  fichasLideradas: FichaOrmEntity[];

  @ManyToOne(() => RoleOrmEntity, (role) => role.usuarios, {
    nullable: false,
    onDelete: 'RESTRICT',
  })
  @JoinColumn({ name: 'role_id' })
  role: RoleOrmEntity;

  @CreateDateColumn({ name: 'creado_en' })
  creadoEn: Date;

  @UpdateDateColumn({ name: 'actualizado_en' })
  actualizadoEn: Date;

  @BeforeInsert()
  @BeforeUpdate()
  checkFields() {
    this.nombre = this.nombre.trim();
    this.correo = this.correo.trim().toLowerCase();
  }
}
