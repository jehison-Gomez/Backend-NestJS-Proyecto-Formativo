import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Programa } from "src/programas/domain/programa.entity";
import { ProgramaRepository } from "src/programas/domain/programa.repository";
import { ProgramaOrmEntity } from "./programa.orm-entity";

@Injectable()
export class TypeOrmProgramaRepository implements ProgramaRepository {
  constructor(
    @InjectRepository(ProgramaOrmEntity)
    private readonly repo: Repository<ProgramaOrmEntity>,
  ) {}

  private toDomain(orm: ProgramaOrmEntity): Programa {
    return new Programa({
      id_programa: orm.id_programa,
      nombre: orm.nombre,
      nivel_formacion: orm.nivel_formacion,
      estado: orm.estado,
      id_area: orm.id_area,
    });
  }

  private toOrm(programa: Partial<Programa>): Partial<ProgramaOrmEntity> {
    return {
      ...(programa.nombre !== undefined && { nombre: programa.nombre}),
      ...(programa.codigo !== undefined && { codigo: programa.codigo}),
      ...(programa.nivel_formacion !== undefined && { nivel_formacion: programa.nivel_formacion}),
      ...(programa.estado !== undefined && { estado: programa.estado}),
      ...(programa.id_area !== undefined && { id_area: programa.id_area}),
    };
  }

  async create(programa: Programa): Promise<Programa> {
    const ormEntity = this.repo.create(this.toOrm(programa));
    const saved = await this.repo.save(ormEntity);
    return this.toDomain(saved);
  }

  async findAll(): Promise<Programa[]> {
    const list = await this.repo.find();
    return list.map(this.toDomain.bind(this));
  }

  async findOne(id: string): Promise<Programa | null> {
    const found = await this.repo.findOneBy({ id_programa: id });
    return found ? this.toDomain(found) : null;
  }

  async update(id: string, programa: Partial<Programa>): Promise<Programa> {
    await this.repo.update(id, this.toOrm(programa));
    const update = await this.repo.findOneBy({ id_programa: id });
    if (!update) throw new NotFoundException(`Programa #${id} no encontrado`);
    return this.toDomain(update);
  }

  async remove(id: string): Promise<void> {
    const existing = await this.repo.findOneBy({ id_programa: id });
    if (!existing) throw new NotFoundException(`Programa #${id} no encontrado`);
    await this.repo.delete(id);
  }
}