import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProgramaRepository } from '../../domain/programa.repository';
import { Programa } from '../../domain/programa.entity';
import { ProgramaOrmEntity } from './programa.orm-entity';

@Injectable()
export class TypeOrmProgramaRepository implements ProgramaRepository {
  constructor(
    @InjectRepository(ProgramaOrmEntity)
    private readonly repo: Repository<ProgramaOrmEntity>,
  ) {}

  private toDomain(orm: ProgramaOrmEntity): Programa {
    return new Programa({
      id: orm.id,
      nombre: orm.nombre,
      codigo: orm.codigo,
      estado: orm.estado,
      creadoEn: orm.creadoEn,
      actualizadoEn: orm.actualizadoEn,
    });
  }

  private toOrm(programa: Partial<Programa>): Partial<ProgramaOrmEntity> {
    return {
      ...(programa.nombre !== undefined && { nombre: programa.nombre }),
      ...(programa.codigo !== undefined && { codigo: programa.codigo }),
      ...(programa.estado !== undefined && { estado: programa.estado }),
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
    const found = await this.repo.findOneBy({ id });
    return found ? this.toDomain(found) : null;
  }

  async update(id: string, programa: Partial<Programa>): Promise<Programa> {
    await this.repo.update(id, this.toOrm(programa));
    const updated = await this.repo.findOneBy({ id });
    return this.toDomain(updated!);
  }

  async remove(id: string): Promise<void> {
    await this.repo.delete(id);
  }
}
