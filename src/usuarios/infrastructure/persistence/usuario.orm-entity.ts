import { Column, Entity, PrimaryGeneratedColumn, BeforeInsert, BeforeUpdate, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { FichaOrmEntity } from 'src/fichas/infrastructure/persistence/ficha.orm-entity';
import { RolOrmEntity } from 'src/rol/infrastructure/persistence/rol.orm-entity';
import { UsuarioEstado } from 'src/usuarios/domain/usuario-estado.enum';

@Entity('usuarios')
export class UsuarioOrmEntity {

  @PrimaryGeneratedColumn('uuid')
  id_usuario: string;

  @Column('text', { unique: true })
  nombre: string;

  @Column('text', { unique: true })
  correo: string;

  @Column('text')
  contrasena: string;

  @Column('text')
  telefono: string;

  @Column('text')
  documento: string;

  @Column({ type: 'enum', enum: UsuarioEstado})
  estado: UsuarioEstado;

  @Column('timestamp')
  fecha_registro: Date;

  @Column('timestamp')
  ultimo_acceso: Date;

  @ManyToOne(() => FichaOrmEntity, (ficha) => ficha.usuarios, { nullable: true })
  @JoinColumn({ name: 'id_ficha' })
  ficha: FichaOrmEntity;

  @OneToMany(() => FichaOrmEntity, (ficha) => ficha.usuario_lider)
  fichas_lider: FichaOrmEntity[];

  @OneToMany(() => RolOrmEntity, (rol: any) => rol.usuario)
  roles: RolOrmEntity[];

  @BeforeInsert()
  @BeforeUpdate()
  checkFields() {
    this.nombre = this.nombre.trim().toLowerCase();
    this.contrasena = this.contrasena.trim().toLowerCase();
  }
}