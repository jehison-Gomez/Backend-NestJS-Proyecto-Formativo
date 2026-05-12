import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FichaRepository } from '../../domain/ficha.repository';
import { Ficha } from '../../domain/ficha.entity';
import { FichaOrmEntity } from './ficha.orm-entity';
import { Programa } from 'src/programas/domain/programa.entity';

@Injectable()
export class TypeOrmFichaRepository implements FichaRepository {
  constructor(
    @InjectRepository(FichaOrmEntity)
    private readonly repo: Repository<FichaOrmEntity>,
  ) {}

  private toDomain(orm: FichaOrmEntity): Ficha {
    return new Ficha({
      id: orm.id,
      codigoFicha: orm.codigoFicha,
      fechaInicio: orm.fechaInicio,
      fechaFin: orm.fechaFin,
      estado: orm.estado,
      programa: orm.programa ? new Programa({
        id: orm.programa.id,
        nombre: orm.programa.nombre,
        codigo: orm.programa.codigo,
        nivelFormacion: orm.programa.nivelFormacion,
        estado: orm.programa.estado,
      }) : undefined,
      creadoEn: orm.creadoEn,
      actualizadoEn: orm.actualizadoEn,
    });
  }

  private toOrm(ficha: Partial<Ficha>): Partial<FichaOrmEntity> {
    return {
      ...(ficha.codigoFicha !== undefined && { codigoFicha: ficha.codigoFicha }),
      ...(ficha.fechaInicio !== undefined && { fechaInicio: ficha.fechaInicio }),
      ...(ficha.fechaFin !== undefined && { fechaFin: ficha.fechaFin }),
      ...(ficha.estado !== undefined && { estado: ficha.estado }),
      ...(ficha.programa !== undefined && { programa: { id: ficha.programa.id } as any }),
    };
  }

  async create(ficha: Ficha): Promise<Ficha> {
    const ormEntity = this.repo.create(this.toOrm(ficha));
    const saved = await this.repo.save(ormEntity);
    const result = await this.findOne(saved.id);
    return result!;
  }

  async findAll(): Promise<Ficha[]> {
    const list = await this.repo.find({
      relations: ['programa'],
    });
    return list.map(this.toDomain.bind(this));
  }

  async findOne(id: string): Promise<Ficha | null> {
    const found = await this.repo.findOne({
      where: { id },
      relations: ['programa'],
    });
    return found ? this.toDomain(found) : null;
  }

  async update(id: string, ficha: Partial<Ficha>): Promise<Ficha> {
    await this.repo.update(id, this.toOrm(ficha));
    const result = await this.findOne(id);
    return result!;
  }

  async remove(id: string): Promise<void> {
    await this.repo.delete(id);
  }
}
