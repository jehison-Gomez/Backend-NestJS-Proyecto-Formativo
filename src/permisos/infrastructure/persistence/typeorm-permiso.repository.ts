import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Permiso } from "src/permisos/domain/permiso.entity";
import { PermisoRepository } from "src/permisos/domain/permiso.repository";
import { PermisoOrmEntity } from "./permiso.orm-entity";

@Injectable()
export class TypeOrmPermisoRepository implements PermisoRepository {
  constructor(
    @InjectRepository(PermisoOrmEntity)
    private readonly repo: Repository<PermisoOrmEntity>,
  ) {}

  private toDomain(orm: PermisoOrmEntity): Permiso {
    return new Permiso({
      id_permiso: orm.id_permiso,
      nombre: orm.nombre,
      descripcion: orm.descripcion,
      modulo: orm.modulo,
      accion: orm.accion,
      activo: orm.activo,
    });
  }

  private toOrm(permiso: Partial<Permiso>): Partial<PermisoOrmEntity> {
    return {
      ...(permiso.nombre !== undefined && { nombre: permiso.nombre}),
      ...(permiso.descripcion !== undefined && { descripcion: permiso.descripcion}),
      ...(permiso.modulo !== undefined && { modulo: permiso.modulo}),
      ...(permiso.accion !== undefined && { accion: permiso.accion}),
      ...(permiso.activo !== undefined && { activo: permiso.activo}),
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
    const found = await this.repo.findOneBy({ id_permiso: id });
    return found ? this.toDomain(found) : null;
  }

  async update(id: string, permiso: Partial<Permiso>): Promise<Permiso> {
    await this.repo.update(id, this.toOrm(permiso));
    const update = await this.repo.findOneBy({ id_permiso: id });
    if (!update) throw new NotFoundException(`Permiso #${id} no encontrado`);
    return this.toDomain(update);
  }

  async remove(id: string): Promise<void> {
    const existing = await this.repo.findOneBy({ id_permiso: id });
    if (!existing) throw new NotFoundException(`Permiso #${id} no encontrado`);
    await this.repo.delete(id);
  }
}