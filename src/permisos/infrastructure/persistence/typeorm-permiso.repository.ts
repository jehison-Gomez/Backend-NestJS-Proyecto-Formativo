import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PermisoRepository } from '../../domain/permiso.repository';
import { Permiso } from '../../domain/permiso.entity';
import { PermisoOrmEntity } from './permiso.orm-entity';

@Injectable()
export class TypeOrmPermisoRepository implements PermisoRepository {
  constructor(
    @InjectRepository(PermisoOrmEntity)
    private readonly repo: Repository<PermisoOrmEntity>,
  ) {}

  private toDomain(orm: PermisoOrmEntity): Permiso {
    return new Permiso({
      id: orm.id,
      nombre: orm.nombre,
      descripcion: orm.descripcion,
      modulo: orm.modulo,
      accion: orm.accion,
      estado: orm.estado,
      creadoEn: orm.creadoEn,
      actualizadoEn: orm.actualizadoEn,
    });
  }

  private toOrm(permiso: Partial<Permiso>): Partial<PermisoOrmEntity> {
    return {
      ...(permiso.nombre !== undefined && { nombre: permiso.nombre }),
      ...(permiso.descripcion !== undefined && { descripcion: permiso.descripcion }),
      ...(permiso.modulo !== undefined && { modulo: permiso.modulo }),
      ...(permiso.accion !== undefined && { accion: permiso.accion }),
      ...(permiso.estado !== undefined && { estado: permiso.estado }),
    };
  }

  async create(permiso: Permiso): Promise<Permiso> {
    const ormEntity = this.repo.create(this.toOrm(permiso));
    const saved = await this.repo.save(ormEntity);
    return this.toDomain(saved);
  }

  async findAll(): Promise<Permiso[]> {
    const list = await this.repo.find();
    return list.map(this.toDomain.bind(this));
  }

  async findOne(id: string): Promise<Permiso | null> {
    const found = await this.repo.findOneBy({ id });
    return found ? this.toDomain(found) : null;
  }

  async update(id: string, permiso: Partial<Permiso>): Promise<Permiso> {
    await this.repo.update(id, this.toOrm(permiso));
    const updated = await this.repo.findOneBy({ id });
    return this.toDomain(updated!);
  }

  async remove(id: string): Promise<void> {
    await this.repo.delete(id);
  }
}
