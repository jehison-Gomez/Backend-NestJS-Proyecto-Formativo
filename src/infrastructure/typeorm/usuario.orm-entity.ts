import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { UsuarioStatus } from '../../domain/entities/usuario.entity';

@Entity('usuario')
export class UsuarioOrmEntity {
  @PrimaryGeneratedColumn({ name: 'ID_Usuario' })
  id!: number;

  @Column({ name: 'Nombre', type: 'varchar', length: 255 })
  nombre!: string;

  @Column({ name: 'Apellido', type: 'varchar', length: 255 })
  apellido!: string;

  @Column({ name: 'Correo', type: 'varchar', length: 255, unique: true })
  correo!: string;

  @Column({ name: 'Contrasena', type: 'varchar', length: 255 })
  contrasena!: string;

  @Column({ name: 'Estado', type: 'enum', enum: UsuarioStatus, default: UsuarioStatus.ACTIVO })
  estado!: UsuarioStatus;

  @Column({ name: 'FK_ID_Ficha', type: 'int', nullable: true })
  fichaId?: number;

  @Column({ name: 'FK_ID_Rol', type: 'int', nullable: true })
  rolId?: number;

  @Column({ name: 'FK_ID_Asignacion', type: 'int', nullable: true })
  asignacionId?: number;
}
