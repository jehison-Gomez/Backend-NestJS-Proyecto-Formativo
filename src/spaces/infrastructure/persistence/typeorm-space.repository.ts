// infrastructure/persistence/typeorm-space.repository.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SpaceRepository } from '../../domain/space.repository';
import { Space } from '../../domain/space.entity';
import { SpaceOrmEntity } from './space.orm-entity';

@Injectable()
export class TypeOrmSpaceRepository implements SpaceRepository {
  constructor(
    @InjectRepository(SpaceOrmEntity)
    private readonly repo: Repository<SpaceOrmEntity>,
  ) {}

  async save(space: Space): Promise<Space> {
    const orm = this.repo.create({
      name: space.name,
      type: space.type,
      area_id: space.area_id,
    });
    const saved = await this.repo.save(orm);
    return this.toDomain(saved);
  }

  async findAll(): Promise<Space[]> {
    const list = await this.repo.find();
    return list.map((orm) => this.toDomain(orm));
  }

  async findById(id: string): Promise<Space | null> {
    const found = await this.repo.findOneBy({ id });
    return found ? this.toDomain(found) : null;
  }

  async delete(id: string): Promise<void> {
    await this.repo.delete(id);
  }

  // convierte OrmEntity → dominio
  private toDomain(orm: SpaceOrmEntity): Space {
    const space = new Space();
    space.id = orm.id;
    space.name = orm.name;
    space.type = orm.type as any; // casteo necesario por el enum
    space.area_id = orm.area_id;
    return space;
  }
}
