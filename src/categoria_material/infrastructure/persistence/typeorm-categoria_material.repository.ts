import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Categoria_materialRepository } from '../../domain/categoria_material.repository';
import { Categoria_material } from '../../domain/categoria_material.entity';
import { Categoria_materialOrmEntity } from './categoria_material.orm-entity';

@Injectable()
export class TypeOrmCategoria_materialRepository implements Categoria_materialRepository {
  constructor(
    @InjectRepository(Categoria_materialOrmEntity)
    private readonly repo: Repository<Categoria_materialOrmEntity>,
  ) {}

  private toDomain(orm: Categoria_materialOrmEntity): Categoria_material {
    return new Categoria_material({
      id: orm.id,
      nombre: orm.nombre,
      descripcion: orm.descripcion,
      estado: orm.estado,
      creadoEn: orm.creadoEn,
      actualizadoEn: orm.actualizadoEn,
    });
  }

  private toOrm(categoria_material: Partial<Categoria_material>): Partial<Categoria_materialOrmEntity> {
    return {
      ...(categoria_material.nombre !== undefined && { nombre: categoria_material.nombre }),
      ...(categoria_material.descripcion !== undefined && { descripcion: categoria_material.descripcion }),
      ...(categoria_material.estado !== undefined && { estado: categoria_material.estado }),
    };
  }

  async create(categoria_material: Categoria_material): Promise<Categoria_material> {
    const ormEntity = this.repo.create(this.toOrm(categoria_material));
    const saved = await this.repo.save(ormEntity);
    const result = await this.findOne(saved.id);
    return result!;
  }

  async findAll(): Promise<Categoria_material[]> {
    const list = await this.repo.find();
    return list.map(this.toDomain.bind(this));
  }

  async findOne(id: string): Promise<Categoria_material | null> {
    const found = await this.repo.findOne({
      where: { id }
    });
    return found ? this.toDomain(found) : null;
  }

  async update(id: string, categoria_material: Partial<Categoria_material>): Promise<Categoria_material> {
    await this.repo.update(id, this.toOrm(categoria_material));
    const result = await this.findOne(id);
    return result!;
  }

  async remove(id: string): Promise<void> {
    await this.repo.delete(id);
  }
}
