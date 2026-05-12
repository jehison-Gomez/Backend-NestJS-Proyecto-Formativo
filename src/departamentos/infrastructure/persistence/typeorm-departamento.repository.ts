import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DepartamentoRepository } from '../../domain/departamento.repository';
import { Departamento } from '../../domain/departamento.entity';
import { DepartamentoOrmEntity } from './departamento.orm-entity';

@Injectable()
export class TypeOrmDepartamentoRepository implements DepartamentoRepository {
  constructor(
    @InjectRepository(DepartamentoOrmEntity)
    private readonly repo: Repository<DepartamentoOrmEntity>,
  ) {}

  private toDomain(orm: DepartamentoOrmEntity): Departamento {
    return new Departamento({
      id: orm.id,
      nombre: orm.nombre,
      codigo: orm.codigo,
      estado: orm.estado,
      creadoEn: orm.creadoEn,
      actualizadoEn: orm.actualizadoEn,
    });
  }

  private toOrm(departamento: Partial<Departamento>): Partial<DepartamentoOrmEntity> {
    return {
      ...(departamento.nombre !== undefined && { nombre: departamento.nombre }),
      ...(departamento.codigo !== undefined && { codigo: departamento.codigo }),
      ...(departamento.estado !== undefined && { estado: departamento.estado }),
    };
  }

  async create(departamento: Departamento): Promise<Departamento> {
    const ormEntity = this.repo.create(this.toOrm(departamento));
    const saved = await this.repo.save(ormEntity);
    return this.toDomain(saved);
  }

  async findAll(): Promise<Departamento[]> {
    const list = await this.repo.find();
    return list.map(this.toDomain.bind(this));
  }

  async findOne(id: string): Promise<Departamento | null> {
    const found = await this.repo.findOneBy({ id });
    return found ? this.toDomain(found) : null;
  }

  async update(id: string, departamento: Partial<Departamento>): Promise<Departamento> {
    await this.repo.update(id, this.toOrm(departamento));
    const updated = await this.repo.findOneBy({ id });
    return this.toDomain(updated!);
  }

  async remove(id: string): Promise<void> {
    await this.repo.delete(id);
  }
}
