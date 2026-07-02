import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Material_consumibleRepository } from '../../domain/material_consumible.repository';
import { Material_consumible } from '../../domain/material_consumible.entity';
import { Material_consumibleOrmEntity } from './material_consumible.orm-entity';

@Injectable()
export class TypeOrmMaterial_consumibleRepository implements Material_consumibleRepository {
  constructor(
    @InjectRepository(Material_consumibleOrmEntity)
    private readonly repo: Repository<Material_consumibleOrmEntity>,
  ) {}

  private toDomain(orm: Material_consumibleOrmEntity): Material_consumible {
    return new Material_consumible({
      id:               orm.id,
      stockActual:      Number(orm.stockActual),
      stockMinimo:      Number(orm.stockMinimo),
      unidadMedida:     orm.unidadMedida,
      fechaVencimiento: orm.fechaVencimiento,
      estado:           orm.estado,
      materiale:        orm.materiale ? { id: orm.materiale.id, nombre: orm.materiale.nombre } as any : undefined,
      creadoEn:         orm.creadoEn,
      actualizadoEn:    orm.actualizadoEn,
    });
  }

  private toOrm(mc: Partial<Material_consumible>): Partial<Material_consumibleOrmEntity> {
    return {
      ...(mc.stockActual      !== undefined && { stockActual:      mc.stockActual }),
      ...(mc.stockMinimo      !== undefined && { stockMinimo:      mc.stockMinimo }),
      ...(mc.unidadMedida     !== undefined && { unidadMedida:     mc.unidadMedida }),
      ...(mc.fechaVencimiento !== undefined && { fechaVencimiento: mc.fechaVencimiento }),
      ...(mc.estado           !== undefined && { estado:           mc.estado }),
      ...(mc.materiale        !== undefined && { materiale:        { id: mc.materiale.id } as any }),
    };
  }

  async create(mc: Material_consumible): Promise<Material_consumible> {
    const ormEntity = this.repo.create(this.toOrm(mc));
    const saved = await this.repo.save(ormEntity);
    return (await this.findOne(saved.id))!;
  }

  async findAll(sedeId?: string | null): Promise<Material_consumible[]> {
    const query = this.repo.createQueryBuilder('mc')
      .leftJoinAndSelect('mc.materiale',      'materiale')
      .leftJoin('materiale.ficha',            'ficha')
      .leftJoin('ficha.programa',             'programa')
      .leftJoin('programa.area',              'area')
      .leftJoin('area.sede',                  'sede');

    if (sedeId !== undefined) {
      query.where(sedeId ? 'sede.id = :sedeId' : '1 = 0', sedeId ? { sedeId } : {});
    }

    const list = await query.getMany();
    return list.map(this.toDomain.bind(this));
  }

  async findOne(id: string): Promise<Material_consumible | null> {
    const found = await this.repo.findOne({ where: { id }, relations: ['materiale'] });
    return found ? this.toDomain(found) : null;
  }

  async update(id: string, mc: Partial<Material_consumible>): Promise<Material_consumible> {
    await this.repo.update(id, this.toOrm(mc));
    return (await this.findOne(id))!;
  }

  async remove(id: string): Promise<void> {
    await this.repo.delete(id);
  }
}
