import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Ficha } from "src/fichas/domain/ficha.entity";
import { FichaRepository } from "src/fichas/domain/ficha.repository";
import { FichaOrmEntity } from "./ficha.orm-entity";
import { ProgramaOrmEntity } from "src/programas/infrastructure/persistence/programa.orm-entity";
import { UsuarioOrmEntity } from "src/usuarios/infrastructure/persistence/usuario.orm-entity";

const RELATIONS = ['programa', 'usuario_lider'];

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
      id_programa: orm.programa?.id_programa,
      id_usuario_lider: orm.usuario_lider?.id_usuario,
    });
  }

  private toOrm(ficha: Partial<Ficha>): Partial<FichaOrmEntity> {
    return {
      ...(ficha.codigo_ficha !== undefined && { codigo_ficha: ficha.codigo_ficha }),
      ...(ficha.fecha_inicio !== undefined && { fecha_inicio: ficha.fecha_inicio }),
      ...(ficha.fecha_fin !== undefined && { fecha_fin: ficha.fecha_fin }),
      ...(ficha.estado !== undefined && { estado: ficha.estado }),
      ...(ficha.id_programa !== undefined && { programa: { id_programa: ficha.id_programa } as ProgramaOrmEntity }),
      ...(ficha.id_usuario_lider !== undefined && { usuario_lider: { id_usuario: ficha.id_usuario_lider } as UsuarioOrmEntity }),
    };
  }

  async create(ficha: Ficha): Promise<Ficha> {
    const ormEntity = this.repo.create(this.toOrm(ficha));
    const saved = await this.repo.save(ormEntity);
    const reloaded = await this.repo.findOne({ where: { id_ficha: saved.id_ficha }, relations: RELATIONS });
    return this.toDomain(reloaded!);
  }

  async findAll(): Promise<Ficha[]> {
    const list = await this.repo.find({ relations: RELATIONS });
    return list.map(this.toDomain.bind(this));
  }

  async findOne(id: string): Promise<Ficha | null> {
    const found = await this.repo.findOne({ where: { id_ficha: id }, relations: RELATIONS });
    return found ? this.toDomain(found) : null;
  }

  async update(id: string, ficha: Partial<Ficha>): Promise<Ficha> {
    const existing = await this.repo.findOne({ where: { id_ficha: id }, relations: RELATIONS });
    if (!existing) throw new NotFoundException(`Ficha #${id} no encontrado`);
    Object.assign(existing, this.toOrm(ficha));
    const saved = await this.repo.save(existing);
    return this.toDomain(saved);
  }

  async remove(id: string): Promise<void> {
    const existing = await this.repo.findOneBy({ id_ficha: id });
    if (!existing) throw new NotFoundException(`Ficha #${id} no encontrada`);
    await this.repo.delete(id);
  }
}