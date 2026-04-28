import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RegionRepository } from 'src/regions/domain/region.repository';
import { RegionOrmEntity } from './region.orm-entity';
import { Repository } from 'typeorm';
import { Region } from 'src/regions/domain/region.entity';

@Injectable()
export class TypeOrmRegionRepository implements RegionRepository {
  constructor(
    @InjectRepository(RegionOrmEntity)
    private readonly repo: Repository<RegionOrmEntity>,
  ) {}

  async save(region: Region): Promise<Region> {
    const orm = this.repo.create({ name: region.name });
    const saved = await this.repo.save(orm);
    return this.toDomain(saved);
  }

  async findAll(): Promise<Region[]> {
    const list = await this.repo.find();
    return list.map((orm) => this.toDomain(orm));
  }

  async findById(id: string): Promise<Region | null> {
    const found = await this.repo.findOneBy({ id });
    return found ? this.toDomain(found) : null;
  }

  async delete(id: string): Promise<void> {
    await this.repo.delete(id);
  }

  // Convierte OrmEntity -> dominio
  private toDomain(orm: RegionOrmEntity): Region {
    const region = new Region();
    region.id = orm.id;
    region.name = orm.name;
    return region;
  }
}
