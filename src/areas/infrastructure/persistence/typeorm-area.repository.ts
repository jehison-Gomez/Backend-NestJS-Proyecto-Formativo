import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AreaOrmEntity } from './area.orm-entity';
// Importa tu interfaz y entidad de dominio aquí
// import { AreaRepository } from '../../domain/area.repository';
// import { Area } from '../../domain/area.entity';

@Injectable()
export class TypeOrmAreaRepository {
  constructor(
    @InjectRepository(AreaOrmEntity)
    private readonly repo: Repository<AreaOrmEntity>,
  ) {}

  async save(area: any): Promise<any> {
    // Creamos la entidad ORM mapeando los campos
    const orm = this.repo.create({ 
      name: area.name, 
      site_id: area.site_id 
    });
    
    const saved = await this.repo.save(orm);
    return this.toDomain(saved);
  }

  private toDomain(orm: AreaOrmEntity): any {
    // Mapeo simple de ORM a Dominio
    return {
      id: orm.id,
      name: orm.name,
      site_id: orm.site_id
    };
  }
}