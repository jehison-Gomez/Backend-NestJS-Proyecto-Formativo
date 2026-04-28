import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MaterialOrmEntity } from './material.orm-entity';
import { MaterialRepository } from '../../domain/material.repository';
import { Material } from '../../domain/material.entity';

@Injectable()
export class TypeOrmMaterialRepository implements MaterialRepository {
  constructor(
    @InjectRepository(MaterialOrmEntity)
    private readonly repo: Repository<MaterialOrmEntity>,
  ) {}

  async save(material: Material): Promise<Material> {
    const entity = this.repo.create(material);
    const saved = await this.repo.save(entity);
    return saved as Material;
  }

  async findAll(): Promise<Material[]> {
    return this.repo.find() as Promise<Material[]>;
  }

  async findById(id: number): Promise<Material | null> {
    return this.repo.findOneBy({ id_material: id }) as Promise<Material | null>;
  }

  async delete(id: number): Promise<void> {
    await this.repo.delete({ id_material: id });
  }
}
