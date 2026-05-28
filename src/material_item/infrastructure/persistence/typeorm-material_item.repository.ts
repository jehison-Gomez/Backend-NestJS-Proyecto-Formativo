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
      id: orm.id,
      codigoSena: orm.codigoSena,
      condicion: orm.condicion,
      observacion: orm.observacion,
      estadoItem: orm.estadoItem,
      estado: orm.estado,
      creadoEn: orm.creadoEn,
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
    };
  }

  async create(mi: Material_item): Promise<Material_item> {
    const ormEntity = this.repo.create(this.toOrm(mi));
    const saved = await this.repo.save(ormEntity);
    return this.toDomain(saved);
  }

  async findAll(): Promise<Material_item[]> {
    const list = await this.repo.find();
    return list.map(this.toDomain.bind(this));
  }

  async findOne(id: string): Promise<Material_item | null> {
    const found = await this.repo.findOneBy({ id });
    return found ? this.toDomain(found) : null;
  }

  async update(id: string, mi: Partial<Material_item>): Promise<Material_item> {
    await this.repo.update(id, this.toOrm(mi));
    const updated = await this.repo.findOneBy({ id });
    return this.toDomain(updated!);
  }

  async remove(id: string): Promise<void> {
    await this.repo.delete(id);
  }
}
