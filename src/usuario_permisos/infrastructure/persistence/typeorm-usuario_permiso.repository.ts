import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UsuarioPermisoRepository } from '../../domain/usuario_permiso.repository';
import { UsuarioPermiso } from '../../domain/usuario_permiso.entity';
import { Usuario_permisoOrmEntity } from './usuario_permiso.orm-entity';
import { Usuario } from 'src/usuarios/domain/usuario.entity';
import { Permiso } from 'src/permisos/domain/permiso.entity';

@Injectable()
export class TypeOrmUsuario_permisoRepository implements UsuarioPermisoRepository {
  constructor(
    @InjectRepository(Usuario_permisoOrmEntity)
    private readonly repo: Repository<Usuario_permisoOrmEntity>,
  ) {}

  private toDomain(orm: Usuario_permisoOrmEntity): UsuarioPermiso {
    return new UsuarioPermiso({
      id: orm.id,
      usuario: orm.usuario ? new Usuario({
        id:              orm.usuario.id,
        nombre:          orm.usuario.nombre,
        correo:          orm.usuario.correo,
        numeroDocumento: orm.usuario.numeroDocumento,
        telefono:        orm.usuario.telefono,
        estado:          orm.usuario.estado,
      }) : undefined,
      permiso: orm.permiso ? new Permiso({
        id:          orm.permiso.id,
        nombre:      orm.permiso.nombre,
        descripcion: orm.permiso.descripcion,
        modulo:      orm.permiso.modulo,
        accion:      orm.permiso.accion,
        estado:      orm.permiso.estado,
      }) : undefined,
      creadoEn:      orm.creadoEn,
      actualizadoEn: orm.actualizadoEn,
    });
  }

  private readonly RELATIONS = ['usuario', 'permiso'];

  async create(usuarioPermiso: UsuarioPermiso): Promise<UsuarioPermiso> {
    const ormEntity = this.repo.create({
      usuario: { id: usuarioPermiso.usuario.id } as any,
      permiso: { id: usuarioPermiso.permiso.id } as any,
    });
    const saved = await this.repo.save(ormEntity);
    return (await this.findOne(saved.id))!;
  }

  async findAll(): Promise<UsuarioPermiso[]> {
    const list = await this.repo.find({ relations: this.RELATIONS });
    return list.map(this.toDomain.bind(this));
  }

  async findOne(id: string): Promise<UsuarioPermiso | null> {
    const found = await this.repo.findOne({ where: { id }, relations: this.RELATIONS });
    return found ? this.toDomain(found) : null;
  }

  async findByUsuario(usuarioId: string): Promise<UsuarioPermiso[]> {
    const list = await this.repo.find({
      where: { usuario: { id: usuarioId } },
      relations: this.RELATIONS,
    });
    return list.map(this.toDomain.bind(this));
  }

  async remove(id: string): Promise<void> {
    await this.repo.delete(id);
  }

  async removeByUsuarioId(usuarioId: string): Promise<void> {
    await this.repo.delete({ usuario: { id: usuarioId } as any });
  }

  async createBulk(usuarioId: string, permisosIds: string[]): Promise<UsuarioPermiso[]> {
    const entities = permisosIds.map((permisoId) =>
      this.repo.create({
        usuario: { id: usuarioId } as any,
        permiso: { id: permisoId } as any,
      }),
    );
    const saved = await this.repo.save(entities);
    const reloaded = await this.repo.find({
      where: saved.map((s) => ({ id: s.id })),
      relations: this.RELATIONS,
    });
    return reloaded.map(this.toDomain.bind(this));
  }
}
