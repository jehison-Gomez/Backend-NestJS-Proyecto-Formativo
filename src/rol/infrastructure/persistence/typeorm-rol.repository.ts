import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Rol } from "src/rol/domain/rol.entity";
import { RolRepository } from "src/rol/domain/rol.repository";
import { RolOrmEntity } from "./rol.orm-entity";

const RELATIONS = [];

@Injectable()
export class TypeOrmRolRepository implements RolRepository {
  constructor(
    @InjectRepository(RolOrmEntity)
    private readonly repo: Repository<RolOrmEntity>,
  ) {}

  private toDomain(orm: RolOrmEntity): Rol {
    return new Rol({
      id_rol: orm.id_rol,
      nombre: orm.nombre,
      descripcion: orm.descripcion,
      nivel_acceso: orm.nivel_acceso,
      activo: orm.activo,
    });
  }

  private toOrm(rol: Partial<Rol>): Partial<RolOrmEntity> {
    return {
      ...(rol.nombre !== undefined && { nombre: rol.nombre }),
      ...(rol.descripcion !== undefined && { descripcion: rol.descripcion }),
      ...(rol.nivel_acceso !== undefined && { nivel_acceso: rol.nivel_acceso }),
      ...(rol.activo !== undefined && { activo: rol.activo }),
    };
  }

  async create(rol: Rol): Promise<Rol> {
    const ormEntity = this.repo.create(this.toOrm(rol));
    const saved = await this.repo.save(ormEntity);
    const reloaded = await this.repo.findOne({ where: { id_rol: saved.id_rol } });
    return this.toDomain(reloaded!);
  }

  async findAll(): Promise<Rol[]> {
    const list = await this.repo.find();
    return list.map(this.toDomain.bind(this));
  }

  async findOne(id: string): Promise<Rol | null> {
    const found = await this.repo.findOne({ where: { id_rol: id } });
    return found ? this.toDomain(found) : null;
  }

  async update(id: string, rol: Partial<Rol>): Promise<Rol> {
    const existing = await this.repo.findOne({ where: { id_rol: id } });
    if (!existing) throw new NotFoundException(`Rol #${id} no encontrado`);
    Object.assign(existing, this.toOrm(rol));
    const saved = await this.repo.save(existing);
    return this.toDomain(saved);
  }

  async remove(id: string): Promise<void> {
    const existing = await this.repo.findOneBy({ id_rol: id });
    if (!existing) throw new NotFoundException(`Rol #${id} no encontrado`);
    await this.repo.delete(id);
  }
}
