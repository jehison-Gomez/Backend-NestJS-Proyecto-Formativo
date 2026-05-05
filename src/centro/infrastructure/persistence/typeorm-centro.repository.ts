import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Centro } from '../../domain/centro.entity';
import { CentroRepository } from '../../domain/centro.repository';
import { CentroOrmEntity } from './centro.orm-entity';

@Injectable()
export class TypeOrmCentroRepository implements CentroRepository {
  constructor(
    @InjectRepository(CentroOrmEntity)
    private readonly repository: Repository<CentroOrmEntity>,
  ) {}

  async create(centro: Centro): Promise<Centro> {
    const newEntity = this.repository.create(centro);
    await this.repository.save(newEntity);
    const saved = await this.repository.findOne({
      where: { id_centro: newEntity.id_centro },
    });
    return this.toDomain(saved!);
  }

  async findAll(): Promise<Centro[]> {
    const entities = await this.repository.find();
    return entities.map((e) => this.toDomain(e));
  }

  async findOne(id: number): Promise<Centro | null> {
    const entity = await this.repository.findOne({ where: { id_centro: id } });
    return entity ? this.toDomain(entity) : null;
  }

  async update(id: number, centro: Partial<Centro>): Promise<Centro> {
    const exists = await this.findOne(id);
    if (!exists) throw new NotFoundException(`Centro #${id} no encontrado`);
    await this.repository.update({ id_centro: id }, this.toOrm(centro));
    return (await this.findOne(id)) as Centro;
  }

  async remove(id: number): Promise<void> {
    const exists = await this.findOne(id);
    if (!exists) throw new NotFoundException(`Centro #${id} no encontrado`);
    await this.repository.delete({ id_centro: id });
  }

  private toDomain(orm: CentroOrmEntity): Centro {
    return new Centro({
      id_centro: orm.id_centro,
      nombre: orm.nombre,
      codigo: orm.codigo,
      direccion: orm.direccion,
      estado: orm.estado,
      id_municipio: orm.id_municipio,
    });
  }

  private toOrm(centro: Partial<Centro>): Partial<CentroOrmEntity> {
    const orm: Partial<CentroOrmEntity> = {};
    if (centro.nombre !== undefined) orm.nombre = centro.nombre;
    if (centro.codigo !== undefined) orm.codigo = centro.codigo;
    if (centro.direccion !== undefined) orm.direccion = centro.direccion;
    if (centro.estado !== undefined) orm.estado = centro.estado;
    if (centro.id_municipio !== undefined)
      orm.id_municipio = centro.id_municipio;
    return orm;
  }
}
