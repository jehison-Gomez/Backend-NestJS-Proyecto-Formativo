import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Material_ubicacionRepository }  from '../../domain/material_ubicacion.repository';
import { Material_ubicacion }            from '../../domain/material_ubicacion.entity';
import { Material_ubicacionOrmEntity }   from './material_ubicacion.orm-entity';
import { Materiale }                     from 'src/materiales/domain/materiale.entity';
import { Ubicacion }                     from 'src/ubicacion/domain/ubicacion.entity';

@Injectable()
export class TypeOrmMaterial_ubicacionRepository implements Material_ubicacionRepository {
  constructor(
    @InjectRepository(Material_ubicacionOrmEntity)
    private readonly repo: Repository<Material_ubicacionOrmEntity>,
  ) {}

  private toDomain(orm: Material_ubicacionOrmEntity): Material_ubicacion {
    return new Material_ubicacion({
      id:           orm.id,
      material:     orm.material ? new Materiale({
        id:          orm.material.id,
        nombre:      orm.material.nombre,
        descripcion: orm.material.descripcion,
        estado:      orm.material.estado,
      }) : undefined,
      ubicacion:    orm.ubicacion ? new Ubicacion({
        id:          orm.ubicacion.id,
        nombre:      orm.ubicacion.nombre,
        descripcion: orm.ubicacion.descripcion,
        estado:      orm.ubicacion.estado,
      }) : undefined,
      creadoEn:     orm.creadoEn,
      actualizadoEn: orm.actualizadoEn,
    });
  }

  private toOrm(mu: Partial<Material_ubicacion>): Partial<Material_ubicacionOrmEntity> {
    return {
      ...(mu.material  !== undefined && { material:  { id: mu.material.id }  as any }),
      ...(mu.ubicacion !== undefined && { ubicacion: { id: mu.ubicacion.id } as any }),
    };
  }

  async create(mu: Material_ubicacion): Promise<Material_ubicacion> {
    const ormEntity = this.repo.create(this.toOrm(mu));
    const saved     = await this.repo.save(ormEntity);
    const result    = await this.findOne(saved.id);
    return result!;
  }

  async findAll(): Promise<Material_ubicacion[]> {
    const list = await this.repo.find({ relations: ['material', 'ubicacion'] });
    return list.map(this.toDomain.bind(this));
  }

  async findOne(id: string): Promise<Material_ubicacion | null> {
    const found = await this.repo.findOne({ where: { id }, relations: ['material', 'ubicacion'] });
    return found ? this.toDomain(found) : null;
  }

  async update(id: string, mu: Partial<Material_ubicacion>): Promise<Material_ubicacion> {
    await this.repo.update(id, this.toOrm(mu));
    const result = await this.findOne(id);
    return result!;
  }

  async remove(id: string): Promise<void> {
    await this.repo.delete(id);
  }
}
