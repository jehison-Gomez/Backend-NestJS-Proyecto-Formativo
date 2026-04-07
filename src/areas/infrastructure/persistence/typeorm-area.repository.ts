import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AreaRepository } from '../../domain/area.repository';
import { Area } from '../../domain/area.entity';
import { AreaOrmEntity } from './area.orm-entity';

@Injectable()
export class TypeOrmAreaRepository implements AreaRepository {

  constructor(
    @InjectRepository(AreaOrmEntity)
    private readonly repo: Repository<AreaOrmEntity>,
  ) {}

  async save(area: Area): Promise<Area> {
    const orm = this.repo.create({ name: area.name, site_id: area.site_id });
    const saved = await this.repo.save(orm);
    return this.toDomain(saved);
  }

  async findAll(): Promise<Area[]> {
    const list = await this.repo.find();
    return list.map(orm => this.toDomain(orm));
  }

  async findById(id: string): Promise<Area | null> {
    const found = await this.repo.findOneBy({ id });
    return found ? this.toDomain(found) : null;
  }

  async delete(id: string): Promise<void> {
    await this.repo.delete(id);
  }

  // convierte OrmEntity → dominio
  private toDomain(orm: AreaOrmEntity): Area {
    const area = new Area();
    area.id = orm.id;
    area.name = orm.name;
    area.site_id = orm.site_id;
    return area;
  }
}