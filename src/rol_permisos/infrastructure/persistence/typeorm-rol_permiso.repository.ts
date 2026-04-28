import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { RolPermiso } from "src/rol_permisos/domain/rol_permiso.entity";
import { RolPermisoRepository } from "src/rol_permisos/domain/rol_permiso.repository";
import { RolPermisoOrmEntity } from "./rol_permiso.orm-entity";

@Injectable()
export class TypeOrmRolPermisoRepository implements RolPermisoRepository {
  constructor(
    @InjectRepository(RolPermisoOrmEntity)
    private readonly repo: Repository<RolPermisoOrmEntity>,
  ) {}

  private toDomain(orm: RolPermisoOrmEntity): RolPermiso {
    return new RolPermiso({
      id_rol_permiso: orm.id_rol_permiso,
      id_rol: orm.id_rol,
      id_permiso: orm.id_permiso,
    });
  }

  private toOrm(rol_permiso: Partial<RolPermiso>): Partial<RolPermisoOrmEntity> {
    return {
      ...(rol_permiso.id_rol !== undefined && { id_rol: rol_permiso.id_rol}),
      ...(rol_permiso.id_permiso !== undefined && { id_permiso: rol_permiso.id_permiso}),
    };
  }

  async create(rol_permiso: RolPermiso): Promise<RolPermiso> {
    const ormEntity = this.repo.create(this.toOrm(rol_permiso));
    const saved = await this.repo.save(ormEntity);
    return this.toDomain(saved);
  }

  async findAll(): Promise<RolPermiso[]> {
    const list = await this.repo.find();
    return list.map(this.toDomain.bind(this));
  }

  async findOne(id: string): Promise<RolPermiso | null> {
    const found = await this.repo.findOneBy({ id_rol_permiso: id });
    return found ? this.toDomain(found) : null;
  }

  async update(id: string, rol_permiso: Partial<RolPermiso>): Promise<RolPermiso> {
    await this.repo.update(id, this.toOrm(rol_permiso));
    const update = await this.repo.findOneBy({ id_rol: id });
    if (!update) throw new NotFoundException(`RolPermiso #${id} no encontrado`);
    return this.toDomain(update);
  }

  async remove(id: string): Promise<void> {
    await this.repo.delete(id);
  }
}