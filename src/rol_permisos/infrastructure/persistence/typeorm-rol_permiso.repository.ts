import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Rol_permisoRepository } from '../../domain/rol_permiso.repository';
import { Rol_permiso } from '../../domain/rol_permiso.entity';
import { Rol_permisoOrmEntity } from './rol_permiso.orm-entity';
import { Role } from 'src/roles/domain/role.entity';
import { Permiso } from 'src/permisos/domain/permiso.entity';

@Injectable()
export class TypeOrmRol_permisoRepository implements Rol_permisoRepository {
  constructor(
    @InjectRepository(Rol_permisoOrmEntity)
    private readonly repo: Repository<Rol_permisoOrmEntity>,
  ) {}

  private toDomain(orm: Rol_permisoOrmEntity): Rol_permiso {
    return new Rol_permiso({
      id:    orm.id,
      role:  orm.role ? new Role({
        id:          orm.role.id,
        nombre:      orm.role.nombre,
        descripcion: orm.role.descripcion,
        nivelAcceso: orm.role.nivelAcceso,
        estado:      orm.role.estado,
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

  private toOrm(rp: Partial<Rol_permiso>): Partial<Rol_permisoOrmEntity> {
    const result: Partial<Rol_permisoOrmEntity> = {};
    if (rp.role)    result.role    = { id: rp.role.id }    as any;
    if (rp.permiso) result.permiso = { id: rp.permiso.id } as any;
    return result;
  }

  async create(rp: Rol_permiso): Promise<Rol_permiso> {
    const orm = this.repo.create(this.toOrm(rp));
    const saved = await this.repo.save(orm);
    const reloaded = await this.repo.findOne({ where: { id: saved.id }, relations: ['role', 'permiso'] });
    return this.toDomain(reloaded!);
  }

  async findAll(): Promise<Rol_permiso[]> {
    const list = await this.repo.find({ relations: ['role', 'permiso'] });
    return list.map(this.toDomain.bind(this));
  }

  async findOne(id: string): Promise<Rol_permiso | null> {
    const found = await this.repo.findOne({ where: { id }, relations: ['role', 'permiso'] });
    return found ? this.toDomain(found) : null;
  }

  async update(id: string, rp: Partial<Rol_permiso>): Promise<Rol_permiso> {
    await this.repo.update(id, this.toOrm(rp));
    const updated = await this.repo.findOne({ where: { id }, relations: ['role', 'permiso'] });
    return this.toDomain(updated!);
  }

  async remove(id: string): Promise<void> {
    await this.repo.delete(id);
  }
}
