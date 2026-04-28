import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { RolPermiso } from "src/rol_permisos/domain/rol_permiso.entity";
import { RolPermisoRepository } from "src/rol_permisos/domain/rol_permiso.repository";
import { RolPermisoOrmEntity } from "./rol_permiso.orm-entity";
import { RolOrmEntity } from "src/rol/infrastructure/persistence/rol.orm-entity";
import { PermisoOrmEntity } from "src/permisos/infrastructure/persistence/permiso.orm-entity";

const RELATIONS = ['rol', 'permiso'];

@Injectable()
export class TypeOrmRolPermisoRepository implements RolPermisoRepository {
  constructor(
    @InjectRepository(RolPermisoOrmEntity)
    private readonly repo: Repository<RolPermisoOrmEntity>,
  ) {}

  private toDomain(orm: RolPermisoOrmEntity): RolPermiso {
    return new RolPermiso({
      id_rol_permiso: orm.id_rol_permiso,
      id_rol: orm.rol?.id_rol,
      id_permiso: orm.permiso?.id_permiso,
    });
  }

  private toOrm(rol_permiso: Partial<RolPermiso>): Partial<RolPermisoOrmEntity> {
    return {
      ...(rol_permiso.id_rol !== undefined && { rol: { id_rol: rol_permiso.id_rol } as RolOrmEntity }),
      ...(rol_permiso.id_permiso !== undefined && { permiso: { id_permiso: rol_permiso.id_permiso } as PermisoOrmEntity }),
    };
  }

  async create(rol_permiso: RolPermiso): Promise<RolPermiso> {
    const ormEntity = this.repo.create(this.toOrm(rol_permiso));
    const saved = await this.repo.save(ormEntity);
    const reloaded = await this.repo.findOne({ where: { id_rol_permiso: saved.id_rol_permiso }, relations: RELATIONS });
    return this.toDomain(reloaded!);
  }

  async findAll(): Promise<RolPermiso[]> {
    const list = await this.repo.find({ relations: RELATIONS });
    return list.map(this.toDomain.bind(this));
  }

  async findOne(id: string): Promise<RolPermiso | null> {
    const found = await this.repo.findOne({ where: { id_rol_permiso: id }, relations: RELATIONS });
    return found ? this.toDomain(found) : null;
  }

  async update(id: string, rol_permiso: Partial<RolPermiso>): Promise<RolPermiso> {
    const existing = await this.repo.findOne({ where: { id_rol_permiso: id }, relations: RELATIONS });
    if (!existing) throw new NotFoundException(`RolPermiso #${id} no encontrado`);
    Object.assign(existing, this.toOrm(rol_permiso));
    const saved = await this.repo.save(existing);
    return this.toDomain(saved);
  }

  async remove(id: string): Promise<void> {
    await this.repo.delete(id);
  }
}