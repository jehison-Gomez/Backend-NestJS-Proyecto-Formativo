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
      nivel: orm.nivel,
      categoriaPadre: orm.categoriaPadre
        ? new Categoria_material({
            id: orm.categoriaPadre.id,
            nombre: orm.categoriaPadre.nombre,
          })
        : null,
      creadoEn: orm.creadoEn,
      actualizadoEn: orm.actualizadoEn,
    });
  }

  private toOrm(categoria_material: Partial<Categoria_material> & { categoriaPadreId?: string }): Partial<Categoria_materialOrmEntity> {
    return {
      ...(categoria_material.nombre !== undefined && { nombre: categoria_material.nombre }),
      ...(categoria_material.descripcion !== undefined && { descripcion: categoria_material.descripcion }),
      ...(categoria_material.estado !== undefined && { estado: categoria_material.estado }),
      ...(categoria_material.nivel !== undefined && { nivel: categoria_material.nivel }),
      ...(categoria_material.categoriaPadre !== undefined && {
        categoriaPadre: categoria_material.categoriaPadre
          ? ({ id: categoria_material.categoriaPadre.id } as Categoria_materialOrmEntity)
          : null,
      }),
    };
  }

  async create(categoria_material: Categoria_material): Promise<Categoria_material> {
    const ormEntity = this.repo.create(this.toOrm(categoria_material));
    const saved = await this.repo.save(ormEntity);
    const result = await this.findOne(saved.id);
    return result!;
  }

  async findAll(): Promise<Categoria_material[]> {
    const list = await this.repo.find({ relations: ['categoriaPadre'] });
    return list.map(this.toDomain.bind(this));
  }

  async findOne(id: string): Promise<Categoria_material | null> {
    const found = await this.repo.findOne({
      where: { id },
      relations: ['categoriaPadre'],
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
