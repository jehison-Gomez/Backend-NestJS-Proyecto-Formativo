import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Sede } from '../../domain/sede.entity';
import { SedeRepository } from '../../domain/sede.repository';
import { SedeOrmEntity } from './sede.orm-entity';

@Injectable()
export class TypeOrmSedeRepository implements SedeRepository {
  constructor(
    @InjectRepository(SedeOrmEntity)
    private readonly repository: Repository<SedeOrmEntity>,
  ) {}

  async create(sede: Sede): Promise<Sede> {
    const newEntity = this.repository.create(sede);
    await this.repository.save(newEntity);
    const saved = await this.repository.findOne({
      where: { id_sede: newEntity.id_sede },
    });
    return this.toDomain(saved!);
  }

  async findAll(): Promise<Sede[]> {
    const entities = await this.repository.find();
    return entities.map((e) => this.toDomain(e));
  }

  async findOne(id: number): Promise<Sede | null> {
    const entity = await this.repository.findOne({ where: { id_sede: id } });
    return entity ? this.toDomain(entity) : null;
  }

  async update(id: number, sede: Partial<Sede>): Promise<Sede> {
    const exists = await this.findOne(id);
    if (!exists) throw new NotFoundException(`Sede #${id} no encontrada`);
    await this.repository.update({ id_sede: id }, this.toOrm(sede));
    return (await this.findOne(id)) as Sede;
  }

  async remove(id: number): Promise<void> {
    const exists = await this.findOne(id);
    if (!exists) throw new NotFoundException(`Sede #${id} no encontrada`);
    await this.repository.delete({ id_sede: id });
  }

  private toDomain(orm: SedeOrmEntity): Sede {
    return new Sede({
      id_sede: orm.id_sede,
      nombre: orm.nombre,
      direccion: orm.direccion,
      estado: orm.estado,
      id_centro: orm.id_centro,
    });
  }

  private toOrm(sede: Partial<Sede>): Partial<SedeOrmEntity> {
    const orm: Partial<SedeOrmEntity> = {};
    if (sede.nombre !== undefined) orm.nombre = sede.nombre;
    if (sede.direccion !== undefined) orm.direccion = sede.direccion;
    if (sede.estado !== undefined) orm.estado = sede.estado;
    if (sede.id_centro !== undefined) orm.id_centro = sede.id_centro;
    return orm;
  }
}
