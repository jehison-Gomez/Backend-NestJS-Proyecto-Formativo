import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Rol } from "src/rol/domain/rol.entity";
import { RolRepository } from "src/rol/domain/rol.repository";
import { RolOrmEntity } from "./rol.orm-entity";

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
      id_usuario: orm.id_usuario,
    });
  }

  private toOrm(rol: Partial<Rol>): Partial<RolOrmEntity> {
    return {
      ...(rol.nombre !== undefined && { nombre: rol.nombre}),
      ...(rol.descripcion !== undefined && { descripcion: rol.descripcion}),
      ...(rol.nivel_acceso !== undefined && { nivel_acceso: rol.nivel_acceso}),
      ...(rol.activo !== undefined && { activo: rol.activo}),
      ...(rol.id_usuario !== undefined && { id_usuario: rol.id_usuario}),
    };
  }

  async create(rol: Rol): Promise<Rol> {
    const ormEntity = this.repo.create(this.toOrm(rol));
    const saved = await this.repo.save(ormEntity);
    return this.toDomain(saved);
  }

  async findAll(): Promise<Rol[]> {
    const list = await this.repo.find();
    return list.map(this.toDomain.bind(this));
  }

  async findOne(id: string): Promise<Rol | null> {
    const found = await this.repo.findOneBy({ id_rol: id });
    return found ? this.toDomain(found) : null;
  }

  async update(id: string, rol: Partial<Rol>): Promise<Rol> {
    await this.repo.update(id, this.toOrm(rol));
    const update = await this.repo.findOneBy({ id_rol: id });
    if (!update) throw new NotFoundException(`Rol #${id} no encontrado`);
    return this.toDomain(update);
  }

  async remove(id: string): Promise<void> {
    await this.repo.delete(id);
  }
}