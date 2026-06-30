import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MunicipioRepository } from '../../domain/municipio.repository';
import { Municipio } from '../../domain/municipio.entity';
import { MunicipioOrmEntity } from './municipio.orm-entity';
import { Departamento } from 'src/departamentos/domain/departamento.entity';

@Injectable()
export class TypeOrmMunicipioRepository implements MunicipioRepository {
  constructor(
    @InjectRepository(MunicipioOrmEntity)
    private readonly repo: Repository<MunicipioOrmEntity>,
  ) {}

  private toDomain(orm: MunicipioOrmEntity): Municipio {
    return new Municipio({
      id: orm.id,
      nombre: orm.nombre,
      codigo: orm.codigo,
      estado: orm.estado,
      departamento: orm.departamento ? new Departamento({
        id: orm.departamento.id,
        nombre: orm.departamento.nombre,
        codigo: orm.departamento.codigo,
        estado: orm.departamento.estado,
        
      })
      : undefined,
      creadoEn: orm.creadoEn,
      actualizadoEn: orm.actualizadoEn,
    });
  }

  private toOrm(municipio: Partial<Municipio>): Partial<MunicipioOrmEntity> {
    return {
      ...(municipio.nombre !== undefined && { nombre: municipio.nombre }),
      ...(municipio.codigo !== undefined && { codigo: municipio.codigo }),
      ...(municipio.estado !== undefined && { estado: municipio.estado }),
      ...(municipio.departamento !== undefined && { departamento: { id: municipio.departamento.id } as any,
      }),
    };
  }

  async create(municipio: Municipio): Promise<Municipio> {
    const ormEntity = this.repo.create(this.toOrm(municipio));
    const saved = await this.repo.save(ormEntity);
    const result = await this.findOne(saved.id);
    return result!;
  }

  async findAll(): Promise<Municipio[]> {
    const list = await this.repo.find({
      relations: ['departamento'],
    });
    return list.map(this.toDomain.bind(this));
  }

  async findOne(id: string): Promise<Municipio | null> {
    const found = await this.repo.findOne({
      where: { id },
      relations: ['departamento'],
    });
    return found ? this.toDomain(found) : null;
  }

  async update(id: string, municipio: Partial<Municipio>): Promise<Municipio> {
    await this.repo.update(id, this.toOrm(municipio));
    const result = await this.findOne(id);
    return result!;
  }

  async remove(id: string): Promise<void> {
    await this.repo.delete(id);
  }
}
