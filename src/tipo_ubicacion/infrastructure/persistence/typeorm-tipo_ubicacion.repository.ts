import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Tipo_ubicacionRepository } from '../../domain/tipo_ubicacion.repository';
import { Tipo_ubicacion } from '../../domain/tipo_ubicacion.entity';
import { Tipo_ubicacionOrmEntity } from './tipo_ubicacion.orm-entity';

@Injectable()
export class TypeOrmTipo_ubicacionRepository implements Tipo_ubicacionRepository {
  constructor(
    @InjectRepository(Tipo_ubicacionOrmEntity)
    private readonly repo: Repository<Tipo_ubicacionOrmEntity>,
  ) {}

  private toDomain(orm: Tipo_ubicacionOrmEntity): Tipo_ubicacion {
    return new Tipo_ubicacion({
      id: orm.id,
      nombre: orm.nombre,
      descripcion: orm.descripcion,
      estado: orm.estado,
      sedeId: orm.sede?.id ?? null,
      creadoEn: orm.creadoEn,
      actualizadoEn: orm.actualizadoEn,
    });
  }

  private toOrm(tipo_ubicacion: Partial<Tipo_ubicacion>): Partial<Tipo_ubicacionOrmEntity> {
    return {
      ...(tipo_ubicacion.nombre !== undefined && { nombre: tipo_ubicacion.nombre }),
      ...(tipo_ubicacion.descripcion !== undefined && { descripcion: tipo_ubicacion.descripcion }),
      ...(tipo_ubicacion.estado !== undefined && { estado: tipo_ubicacion.estado }),
      ...(tipo_ubicacion.sedeId !== undefined && { sede: tipo_ubicacion.sedeId ? { id: tipo_ubicacion.sedeId } as any : null }),
    };
  }

  async create(tipo_ubicacion: Tipo_ubicacion): Promise<Tipo_ubicacion> {
    const ormEntity = this.repo.create(this.toOrm(tipo_ubicacion));
    const saved = await this.repo.save(ormEntity);
    const result = await this.findOne(saved.id);
    return result!;
  }

  async findAll(sedeId?: string | null): Promise<Tipo_ubicacion[]> {
    const query = this.repo.createQueryBuilder('tu')
      .leftJoinAndSelect('tu.sede', 'sede');

    if (sedeId !== undefined) {
      query.where(sedeId ? 'sede.id = :sedeId' : '1 = 0', sedeId ? { sedeId } : {});
    }

    const list = await query.getMany();
    return list.map(this.toDomain.bind(this));
  }

  async findOne(id: string): Promise<Tipo_ubicacion | null> {
    const found = await this.repo.findOne({
      where: { id }
    });
    return found ? this.toDomain(found) : null;
  }

  async update(id: string, tipo_ubicacion: Partial<Tipo_ubicacion>): Promise<Tipo_ubicacion> {
    await this.repo.update(id, this.toOrm(tipo_ubicacion));
    const result = await this.findOne(id);
    return result!;
  }

  async remove(id: string): Promise<void> {
    await this.repo.delete(id);
  }
}
