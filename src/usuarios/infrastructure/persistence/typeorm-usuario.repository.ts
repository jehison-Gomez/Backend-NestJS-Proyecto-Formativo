import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcryptjs';
import { UsuarioRepository } from '../../domain/usuario.repository';
import { Usuario } from '../../domain/usuario.entity';
import { UsuarioOrmEntity } from './usuario.orm-entity';
import { Ficha } from 'src/fichas/domain/ficha.entity';
import { Role } from 'src/roles/domain/role.entity';

@Injectable()
export class TypeOrmUsuarioRepository implements UsuarioRepository {
  constructor(
    @InjectRepository(UsuarioOrmEntity)
    private readonly repo: Repository<UsuarioOrmEntity>,
  ) {}

  private toDomain(orm: UsuarioOrmEntity): Usuario {
    return new Usuario({
      id: orm.id,
      nombre: orm.nombre,
      correo: orm.correo,
      contrasena: orm.contrasena,
      telefono: orm.telefono,
      numeroDocumento: orm.numeroDocumento,
      estado: orm.estado,
      fechaRegistro: orm.fechaRegistro,
      ficha: orm.ficha ? new Ficha({
        id: orm.ficha.id,
        codigoFicha: orm.ficha.codigoFicha,
        fechaInicio: orm.ficha.fechaInicio,
        fechaFin: orm.ficha.fechaFin,
        estado: orm.ficha.estado,
      }) : undefined,
      role: orm.role ? new Role({
        id: orm.role.id,
        nombre: orm.role.nombre,
        descripcion: orm.role.descripcion,
        nivelAcceso: orm.role.nivelAcceso,
        estado: orm.role.estado,
      }) : undefined,
      creadoEn: orm.creadoEn,
      actualizadoEn: orm.actualizadoEn,
    });
  }

  private toOrm(usuario: Partial<Usuario>): Partial<UsuarioOrmEntity> {
    return {
      ...(usuario.nombre !== undefined && { nombre: usuario.nombre }),
      ...(usuario.correo !== undefined && { correo: usuario.correo }),
      ...(usuario.contrasena !== undefined && { contrasena: usuario.contrasena }),
      ...(usuario.telefono !== undefined && { telefono: usuario.telefono }),
      ...(usuario.numeroDocumento !== undefined && { numeroDocumento: usuario.numeroDocumento }),
      ...(usuario.estado !== undefined && { estado: usuario.estado }),
      ...(usuario.ficha !== undefined && { ficha: { id: usuario.ficha.id } as any }),
      ...(usuario.role !== undefined && { role: { id: usuario.role.id } as any }),
    };
  }

  async create(usuario: Usuario): Promise<Usuario> {
    const ormEntity = this.repo.create(this.toOrm(usuario));
    const saved = await this.repo.save(ormEntity);
    const result = await this.findOne(saved.id);
    return result!;
  }

  async findAll(): Promise<Usuario[]> {
    const list = await this.repo.find({
      relations: ['ficha', 'role'],
    });
    return list.map(this.toDomain.bind(this));
  }

  async findOne(id: string): Promise<Usuario | null> {
    const found = await this.repo.findOne({
      where: { id },
      relations: ['ficha', 'role'],
    });
    return found ? this.toDomain(found) : null;
  }

  async findByCorreo(correo: string): Promise<Usuario | null> {
    const found = await this.repo.findOne({
      where: { correo: correo.trim().toLowerCase() },
      relations: ['ficha', 'role'],
    });
    return found ? this.toDomain(found) : null;
  }

  async update(id: string, usuario: Partial<Usuario>): Promise<Usuario> {
    const data = this.toOrm(usuario);
    if (data.contrasena) {
      data.contrasena = await bcrypt.hash(data.contrasena, 10);
    }
    await this.repo.update(id, data);
    const result = await this.findOne(id);
    return result!;
  }

  async remove(id: string): Promise<void> {
    await this.repo.delete(id);
  }
}
