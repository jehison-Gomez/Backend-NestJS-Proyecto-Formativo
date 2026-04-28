import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Ficha } from "src/fichas/domain/ficha.entity";
import { FichaRepository } from "src/fichas/domain/ficha.repository";
import { FichaOrmEntity } from "./ficha.orm-entity";

@Injectable()
export class TypeOrmFichaRepository implements FichaRepository {
  constructor(
    @InjectRepository(FichaOrmEntity)
    private readonly repo: Repository<FichaOrmEntity>,
  ) {}

  private toDomain(orm: FichaOrmEntity): Ficha {
    return new Ficha({
      id_ficha: orm.id_ficha,
      codigo_ficha: orm.codigo_ficha,
      fecha_inicio: orm.fecha_inicio,
      fecha_fin: orm.fecha_fin,
      estado: orm.estado,
      id_programa: orm.id_programa,
      id_usuario_lider: orm.id_usuario_lider,
    });
  }

  private toOrm(ficha: Partial<Ficha>): Partial<FichaOrmEntity> {
    return {
      ...(ficha.codigo_ficha !== undefined && { codigo_ficha: ficha.codigo_ficha}),
      ...(ficha.fecha_inicio !== undefined && { fecha_inicio: ficha.fecha_inicio}),
      ...(ficha.fecha_fin !== undefined && { fecha_fin: ficha.fecha_fin}),
      ...(ficha.estado !== undefined && { estado: ficha.estado}),
      ...(ficha.id_programa !== undefined && { id_programa: ficha.id_programa}),
      ...(ficha.id_usuario_lider !== undefined && { id_usuario_lider: ficha.id_usuario_lider}),
    };
  }

  async create(ficha: Ficha): Promise<Ficha> {
    const ormEntity = this.repo.create(this.toOrm(ficha));
    const saved = await this.repo.save(ormEntity);
    return this.toDomain(saved);
  }

  async findAll(): Promise<Ficha[]> {
    const list = await this.repo.find();
    return list.map(this.toDomain.bind(this));
  }

  async findOne(id: string): Promise<Ficha | null> {
    const found = await this.repo.findOneBy({ id_ficha: id });
    return found ? this.toDomain(found) : null;
  }

  async update(id: string, ficha: Partial<Ficha>): Promise<Ficha> {
    await this.repo.update(id, this.toOrm(ficha));
    const update = await this.repo.findOneBy({ id_ficha: id });
    if (!update) throw new NotFoundException(`Ficha #${id} no encontrado`);
    return this.toDomain(update);
  }

  async remove(id: string): Promise<void> {
    await this.repo.delete(id);
  }
}