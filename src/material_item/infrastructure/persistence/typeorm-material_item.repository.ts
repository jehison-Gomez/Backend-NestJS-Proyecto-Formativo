import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Material_itemRepository } from '../../domain/material_item.repository';
import { Material_item } from '../../domain/material_item.entity';
import { Material_itemOrmEntity } from './material_item.orm-entity';

@Injectable()
export class TypeOrmMaterial_itemRepository implements Material_itemRepository {
  constructor(
    @InjectRepository(Material_itemOrmEntity)
    private readonly repo: Repository<Material_itemOrmEntity>,
  ) {}

  private toDomain(orm: Material_itemOrmEntity): Material_item {
    return new Material_item({
      id:           orm.id,
      codigoSena:   orm.codigoSena,
      condicion:    orm.condicion,
      observacion:  orm.observacion,
      estadoItem:   orm.estadoItem,
      estado:       orm.estado,
      materiale:    orm.materiale ? { id: orm.materiale.id } as any : undefined,
      creadoEn:     orm.creadoEn,
      actualizadoEn: orm.actualizadoEn,
    });
  }

  private toOrm(mi: Partial<Material_item>): Partial<Material_itemOrmEntity> {
    return {
      ...(mi.codigoSena  !== undefined && { codigoSena:  mi.codigoSena }),
      ...(mi.condicion   !== undefined && { condicion:   mi.condicion }),
      ...(mi.observacion !== undefined && { observacion: mi.observacion }),
      ...(mi.estadoItem  !== undefined && { estadoItem:  mi.estadoItem }),
      ...(mi.estado      !== undefined && { estado:      mi.estado }),
      ...(mi.materiale   !== undefined && { materiale:   { id: mi.materiale.id } as any }),
    };
  }

  async create(mi: Material_item): Promise<Material_item> {
    const ormEntity = this.repo.create(this.toOrm(mi));
    const saved = await this.repo.save(ormEntity);
    return (await this.findOne(saved.id))!;
  }

  async findAll(): Promise<Material_item[]> {
    const list = await this.repo.find({ relations: ['materiale'] });
    return list.map(this.toDomain.bind(this));
  }

  async findOne(id: string): Promise<Material_item | null> {
    const found = await this.repo.findOne({ where: { id }, relations: ['materiale'] });
    return found ? this.toDomain(found) : null;
  }

  async update(id: string, mi: Partial<Material_item>): Promise<Material_item> {
    await this.repo.update(id, this.toOrm(mi));
    return (await this.findOne(id))!;
  }

  async remove(id: string): Promise<void> {
    await this.repo.delete(id);
  }
}
