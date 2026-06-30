import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RoleRepository } from '../../domain/role.repository';
import { Role } from '../../domain/role.entity';
import { RoleOrmEntity } from './role.orm-entity';

@Injectable()
export class TypeOrmRoleRepository implements RoleRepository {
  constructor(
    @InjectRepository(RoleOrmEntity)
    private readonly repo: Repository<RoleOrmEntity>,
  ) {}

  private toDomain(orm: RoleOrmEntity): Role {
    return new Role({
      id: orm.id,
      nombre: orm.nombre,
      descripcion: orm.descripcion,
      nivelAcceso: orm.nivelAcceso,
      estado: orm.estado,
      creadoEn: orm.creadoEn,
      actualizadoEn: orm.actualizadoEn,
    });
  }

  private toOrm(role: Partial<Role>): Partial<RoleOrmEntity> {
    return {
      ...(role.nombre !== undefined && { nombre: role.nombre }),
      ...(role.descripcion !== undefined && { descripcion: role.descripcion }),
      ...(role.nivelAcceso !== undefined && { nivelAcceso: role.nivelAcceso }),
      ...(role.estado !== undefined && { estado: role.estado }),
    };
  }

  async create(role: Role): Promise<Role> {
    const ormEntity = this.repo.create(this.toOrm(role));
    const saved = await this.repo.save(ormEntity);
    return this.toDomain(saved);
  }

  async findAll(): Promise<Role[]> {
    const list = await this.repo.find();
    return list.map(this.toDomain.bind(this));
  }

  async findOne(id: string): Promise<Role | null> {
    const found = await this.repo.findOneBy({ id });
    return found ? this.toDomain(found) : null;
  }

  async update(id: string, role: Partial<Role>): Promise<Role> {
    await this.repo.update(id, this.toOrm(role));
    const updated = await this.repo.findOneBy({ id });
    return this.toDomain(updated!);
  }

  async remove(id: string): Promise<void> {
    await this.repo.delete(id);
  }
}
