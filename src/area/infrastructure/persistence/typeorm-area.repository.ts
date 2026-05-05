import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Area } from '../../domain/area.entity';
import { AreaRepository } from '../../domain/area.repository';
import { AreaOrmEntity } from './area.orm-entity';

@Injectable()
export class TypeOrmAreaRepository implements AreaRepository {
  constructor(
    @InjectRepository(AreaOrmEntity)
    private readonly repository: Repository<AreaOrmEntity>,
  ) {}

  async create(area: Area): Promise<Area> {
    const newEntity = this.repository.create(area);
    await this.repository.save(newEntity);
    const saved = await this.repository.findOne({
      where: { id_area: newEntity.id_area },
    });
    return this.toDomain(saved!);
  }

  async findAll(): Promise<Area[]> {
    const entities = await this.repository.find();
    return entities.map((e) => this.toDomain(e));
  }

  async findOne(id: number): Promise<Area | null> {
    const entity = await this.repository.findOne({ where: { id_area: id } });
    return entity ? this.toDomain(entity) : null;
  }

  async update(id: number, area: Partial<Area>): Promise<Area> {
    const exists = await this.findOne(id);
    if (!exists) throw new NotFoundException(`Area #${id} no encontrada`);
    await this.repository.update({ id_area: id }, this.toOrm(area));
    return (await this.findOne(id)) as Area;
  }

  async remove(id: number): Promise<void> {
    const exists = await this.findOne(id);
    if (!exists) throw new NotFoundException(`Area #${id} no encontrada`);
    await this.repository.delete({ id_area: id });
  }

  private toDomain(orm: AreaOrmEntity): Area {
    return new Area({
      id_area: orm.id_area,
      nombre: orm.nombre,
      descripcion: orm.descripcion,
      estado: orm.estado,
      id_sede: orm.id_sede,
      id_usuario_encargado: orm.id_usuario_encargado,
    });
  }

  private toOrm(area: Partial<Area>): Partial<AreaOrmEntity> {
    const orm: Partial<AreaOrmEntity> = {};
    if (area.nombre !== undefined) orm.nombre = area.nombre;
    if (area.descripcion !== undefined) orm.descripcion = area.descripcion;
    if (area.estado !== undefined) orm.estado = area.estado;
    if (area.id_sede !== undefined) orm.id_sede = area.id_sede;
    if (area.id_usuario_encargado !== undefined)
      orm.id_usuario_encargado = area.id_usuario_encargado;
    return orm;
  }
}
