import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Municipio } from '../../domain/municipio.entity';
import { MunicipioRepository } from '../../domain/municipio.repository';
import { MunicipioOrmEntity } from './municipio.orm-entity';

@Injectable()
export class TypeOrmMunicipioRepository implements MunicipioRepository {
  constructor(
    @InjectRepository(MunicipioOrmEntity)
    private readonly repository: Repository<MunicipioOrmEntity>,
  ) {}

  async create(municipio: Municipio): Promise<Municipio> {
    const newEntity = this.repository.create(municipio);
    await this.repository.save(newEntity);
    const saved = await this.repository.findOne({
      where: { id_municipio: newEntity.id_municipio },
    });
    return this.toDomain(saved!);
  }

  async findAll(): Promise<Municipio[]> {
    const entities = await this.repository.find();
    return entities.map((e) => this.toDomain(e));
  }

  async findOne(id: number): Promise<Municipio | null> {
    const entity = await this.repository.findOne({
      where: { id_municipio: id },
    });
    return entity ? this.toDomain(entity) : null;
  }

  async update(id: number, municipio: Partial<Municipio>): Promise<Municipio> {
    const exists = await this.findOne(id);
    if (!exists) throw new NotFoundException(`Municipio #${id} no encontrado`);
    await this.repository.update({ id_municipio: id }, this.toOrm(municipio));
    return (await this.findOne(id)) as Municipio;
  }

  async remove(id: number): Promise<void> {
    const exists = await this.findOne(id);
    if (!exists) throw new NotFoundException(`Municipio #${id} no encontrado`);
    await this.repository.delete({ id_municipio: id });
  }

  private toDomain(orm: MunicipioOrmEntity): Municipio {
    return new Municipio({
      id_municipio: orm.id_municipio,
      nombre: orm.nombre,
      codigo: orm.codigo,
      estado: orm.estado,
      id_departamento: orm.id_departamento,
    });
  }

  private toOrm(municipio: Partial<Municipio>): Partial<MunicipioOrmEntity> {
    const orm: Partial<MunicipioOrmEntity> = {};
    if (municipio.nombre !== undefined) orm.nombre = municipio.nombre;
    if (municipio.codigo !== undefined) orm.codigo = municipio.codigo;
    if (municipio.estado !== undefined) orm.estado = municipio.estado;
    if (municipio.id_departamento !== undefined)
      orm.id_departamento = municipio.id_departamento;
    return orm;
  }
}
