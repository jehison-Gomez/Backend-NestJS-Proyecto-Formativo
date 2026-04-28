import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UbicacionRepository } from '../../domain/ubicacion.repository';
import { UbicacionOrmEntity } from './ubicacion.orm-entity';
import { Ubicacion } from '../../domain/ubicacion.entity';

@Injectable()
export class TypeOrmUbicacionRepository implements UbicacionRepository {
  constructor(
    @InjectRepository(UbicacionOrmEntity)
    private readonly repository: Repository<UbicacionOrmEntity>,
  ) {}

  async save(ubicacion: Ubicacion): Promise<Ubicacion> {
    // Usamos el ORM para guardar la entidad
    const entity = this.repository.create(ubicacion as any);
    const savedEntity = await this.repository.save(entity);
    return savedEntity as any;
  }

  async findAll(): Promise<Ubicacion[]> {
    const entities = await this.repository.find();
    return entities as any[];
  }

  async findById(id: string): Promise<Ubicacion | null> {
    // Buscamos por el campo 'id' (asegúrate que en el OrmEntity se llame 'id')
    const entity = await this.repository.findOne({
      where: { id: id as any }
    });
    return entity as any;
  }

  async delete(id: string): Promise<void> {
    await this.repository.delete(id);
  }
}