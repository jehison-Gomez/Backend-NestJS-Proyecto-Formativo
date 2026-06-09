import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PrestamoItemRepository } from '../../domain/prestamo_item.repository';
import { PrestamoItem } from '../../domain/prestamo_item.entity';
import { PrestamoItemOrmEntity } from './prestamo_item.orm-entity';

@Injectable()
export class TypeOrmPrestamoItemRepository implements PrestamoItemRepository {
  constructor(
    @InjectRepository(PrestamoItemOrmEntity)
    private readonly repo: Repository<PrestamoItemOrmEntity>,
  ) {}

  private toDomain(orm: PrestamoItemOrmEntity): PrestamoItem {
    return new PrestamoItem({
      id:                   orm.id,
      prestamoId:           orm.prestamo?.id,
      materialItemId:       orm.materialItem?.id,
      incluidoEnAprobacion: orm.incluidoEnAprobacion,
      observacion:          orm.observacion ?? undefined,
      estado:               orm.estado,
      creadoEn:             orm.creadoEn,
      actualizadoEn:        orm.actualizadoEn,
    });
  }

  private toOrm(pi: Partial<PrestamoItem>): Partial<PrestamoItemOrmEntity> {
    return {
      ...(pi.prestamoId           !== undefined && { prestamo:           { id: pi.prestamoId } as any }),
      ...(pi.materialItemId       !== undefined && { materialItem:       { id: pi.materialItemId } as any }),
      ...(pi.incluidoEnAprobacion !== undefined && { incluidoEnAprobacion: pi.incluidoEnAprobacion }),
      ...(pi.observacion          !== undefined && { observacion:        pi.observacion }),
      ...(pi.estado               !== undefined && { estado:             pi.estado }),
    };
  }

  async create(prestamoItem: PrestamoItem): Promise<PrestamoItem> {
    const orm = this.repo.create(this.toOrm(prestamoItem));
    const saved = await this.repo.save(orm);
    return (await this.findOne(saved.id))!;
  }

  async findAll(): Promise<PrestamoItem[]> {
    const list = await this.repo.find({ relations: ['prestamo', 'materialItem'] });
    return list.map(this.toDomain.bind(this));
  }

  async findByPrestamo(prestamoId: string): Promise<PrestamoItem[]> {
    const list = await this.repo.find({
      where: { prestamo: { id: prestamoId } },
      relations: ['prestamo', 'materialItem'],
    });
    return list.map(this.toDomain.bind(this));
  }

  async findOne(id: string): Promise<PrestamoItem | null> {
    const found = await this.repo.findOne({ where: { id }, relations: ['prestamo', 'materialItem'] });
    return found ? this.toDomain(found) : null;
  }

  async update(id: string, prestamoItem: Partial<PrestamoItem>): Promise<PrestamoItem> {
    await this.repo.update(id, this.toOrm(prestamoItem));
    return (await this.findOne(id))!;
  }

  async remove(id: string): Promise<void> {
    await this.repo.delete(id);
  }
}
