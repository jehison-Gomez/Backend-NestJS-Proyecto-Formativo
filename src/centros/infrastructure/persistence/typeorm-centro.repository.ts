import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CentroRepository } from '../../domain/centro.repository';
import { Centro } from '../../domain/centro.entity';
import { CentroOrmEntity } from './centro.orm-entity';
import { Municipio } from 'src/municipios/domain/municipio.entity';

@Injectable()
export class TypeOrmCentroRepository implements CentroRepository {
  constructor(
    @InjectRepository(CentroOrmEntity)
    private readonly repo: Repository<CentroOrmEntity>,
  ) {}

  private toDomain(orm: CentroOrmEntity): Centro {
    return new Centro({
      id: orm.id,
      nombre: orm.nombre,
      codigo: orm.codigo,
      direccion: orm.direccion,
      estado: orm.estado,
      municipio: orm.municipio ? new Municipio({
        id: orm.municipio.id,
        nombre: orm.municipio.nombre,
        codigo: orm.municipio.codigo,
        estado: orm.municipio.estado,
      })
      : undefined,
      creadoEn: orm.creadoEn,
      actualizadoEn: orm.actualizadoEn,
    });
  }

  private toOrm(centro: Partial<Centro>): Partial<CentroOrmEntity> {
    return {
      ...(centro.nombre !== undefined && { nombre: centro.nombre }),
      ...(centro.codigo !== undefined && { codigo: centro.codigo }),
      ...(centro.direccion !== undefined && { direccion: centro.direccion }),
      ...(centro.estado !== undefined && { estado: centro.estado }),
      ...(centro.municipio !== undefined && { municipio: { id: centro.municipio.id } as any,
      }),
    };
  }

  async create(centro: Centro): Promise<Centro> {
    const ormEntity = this.repo.create(this.toOrm(centro));
    const saved = await this.repo.save(ormEntity);
    const result = await this.findOne(saved.id);
    return result!;
  }

  async findAll(): Promise<Centro[]> {
    const list = await this.repo.find({
      relations: ['municipio'],
    });
    return list.map(this.toDomain.bind(this));
  }

  async findOne(id: string): Promise<Centro | null> {
    const found = await this.repo.findOne({
      where: { id },
      relations: ['municipio'],
    });
    return found ? this.toDomain(found) : null;
  }

  async update(id: string, centro: Partial<Centro>): Promise<Centro> {
    await this.repo.update(id, this.toOrm(centro));
    const result = await this.findOne(id);
    return result!;
  }

  async remove(id: string): Promise<void> {
    await this.repo.delete(id);
  }
}
