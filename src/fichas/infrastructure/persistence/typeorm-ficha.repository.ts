import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FichaRepository } from '../../domain/ficha.repository';
import { Ficha } from '../../domain/ficha.entity';
import { FichaOrmEntity } from './ficha.orm-entity';

@Injectable()
export class TypeOrmFichaRepository implements FichaRepository {
  constructor(
    @InjectRepository(FichaOrmEntity)
    private readonly repo: Repository<FichaOrmEntity>,
  ) {}

  private toDomain(orm: FichaOrmEntity): Ficha {
    return new Ficha({
      id: orm.id,
      nombre: orm.nombre,
      codigo: orm.codigo,
      estado: orm.estado,
      creadoEn: orm.creadoEn,
      actualizadoEn: orm.actualizadoEn,
    });
  }

  private toOrm(ficha: Partial<Ficha>): Partial<FichaOrmEntity> {
    return {
      ...(ficha.nombre !== undefined && { nombre: ficha.nombre }),
      ...(ficha.codigo !== undefined && { codigo: ficha.codigo }),
      ...(ficha.estado !== undefined && { estado: ficha.estado }),
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
    const found = await this.repo.findOneBy({ id });
    return found ? this.toDomain(found) : null;
  }

  async update(id: string, ficha: Partial<Ficha>): Promise<Ficha> {
    await this.repo.update(id, this.toOrm(ficha));
    const updated = await this.repo.findOneBy({ id });
    return this.toDomain(updated!);
  }

  async remove(id: string): Promise<void> {
    await this.repo.delete(id);
  }
}
