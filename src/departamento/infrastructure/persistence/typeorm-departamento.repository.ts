import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Departamento } from '../../domain/departamento.entity';
import { DepartamentoRepository } from '../../domain/departamento.repository';
import { DepartamentoOrmEntity } from './departamento.orm-entity';

@Injectable()
export class TypeOrmDepartamentoRepository implements DepartamentoRepository {
  constructor(
    @InjectRepository(DepartamentoOrmEntity)
    private readonly repository: Repository<DepartamentoOrmEntity>,
  ) {}

  async create(departamento: Departamento): Promise<Departamento> {
    const newEntity = this.repository.create(departamento);
    await this.repository.save(newEntity);
    const saved = await this.repository.findOne({
      where: { id_departamento: newEntity.id_departamento },
    });
    return this.toDomain(saved!);
  }

  async findAll(): Promise<Departamento[]> {
    const entities = await this.repository.find();
    return entities.map((e) => this.toDomain(e));
  }

  async findOne(id: number): Promise<Departamento | null> {
    const entity = await this.repository.findOne({
      where: { id_departamento: id },
    });
    return entity ? this.toDomain(entity) : null;
  }

  async update(
    id: number,
    departamento: Partial<Departamento>,
  ): Promise<Departamento> {
    const exists = await this.findOne(id);
    if (!exists)
      throw new NotFoundException(`Departamento #${id} no encontrado`);
    await this.repository.update(
      { id_departamento: id },
      this.toOrm(departamento),
    );
    return (await this.findOne(id)) as Departamento;
  }

  async remove(id: number): Promise<void> {
    const exists = await this.findOne(id);
    if (!exists)
      throw new NotFoundException(`Departamento #${id} no encontrado`);
    await this.repository.delete({ id_departamento: id });
  }

  private toDomain(orm: DepartamentoOrmEntity): Departamento {
    return new Departamento({
      id_departamento: orm.id_departamento,
      nombre: orm.nombre,
      codigo: orm.codigo,
      estado: orm.estado,
    });
  }

  private toOrm(
    departamento: Partial<Departamento>,
  ): Partial<DepartamentoOrmEntity> {
    const orm: Partial<DepartamentoOrmEntity> = {};
    if (departamento.nombre !== undefined) orm.nombre = departamento.nombre;
    if (departamento.codigo !== undefined) orm.codigo = departamento.codigo;
    if (departamento.estado !== undefined) orm.estado = departamento.estado;
    return orm;
  }
}
