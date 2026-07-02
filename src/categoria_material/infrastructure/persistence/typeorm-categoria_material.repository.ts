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
      sedeId: orm.sede?.id ?? null,
      creadoEn: orm.creadoEn,
      actualizadoEn: orm.actualizadoEn,
    });
  }

  private toOrm(categoria_material: Partial<Categoria_material>): Partial<Categoria_materialOrmEntity> {
    return {
      ...(categoria_material.nombre !== undefined && { nombre: categoria_material.nombre }),
      ...(categoria_material.descripcion !== undefined && { descripcion: categoria_material.descripcion }),
      ...(categoria_material.estado !== undefined && { estado: categoria_material.estado }),
      ...(categoria_material.sedeId !== undefined && { sede: categoria_material.sedeId ? { id: categoria_material.sedeId } as any : null }),
    };
  }

  async create(categoria_material: Categoria_material): Promise<Categoria_material> {
    const ormEntity = this.repo.create(this.toOrm(categoria_material));
    const saved = await this.repo.save(ormEntity);
    const result = await this.findOne(saved.id);
    return result!;
  }

  async findAll(sedeId?: string | null): Promise<Categoria_material[]> {
    const query = this.repo.createQueryBuilder('cat')
      .leftJoinAndSelect('cat.sede', 'sede');

    if (sedeId !== undefined) {
      query.where(sedeId ? 'sede.id = :sedeId' : '1 = 0', sedeId ? { sedeId } : {});
    }

    const list = await query.getMany();
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
