import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DevolucionItemRepository } from '../../domain/devolucion_item.repository';
import { DevolucionItem } from '../../domain/devolucion_item.entity';
import { DevolucionItemOrmEntity } from './devolucion_item.orm-entity';

@Injectable()
export class TypeOrmDevolucionItemRepository implements DevolucionItemRepository {
  constructor(
    @InjectRepository(DevolucionItemOrmEntity)
    private readonly repo: Repository<DevolucionItemOrmEntity>,
  ) {}

  private toDomain(orm: DevolucionItemOrmEntity): DevolucionItem {
    return new DevolucionItem({
      id:                orm.id,
      devolucionId:      orm.devolucion?.id,
      prestamoItemId:    orm.prestamoItem?.id,
      condicionDevuelta: orm.condicionDevuelta,
      observacion:       orm.observacion ?? undefined,
      conNovedad:        orm.conNovedad,
      creadoEn:          orm.creadoEn,
      actualizadoEn:     orm.actualizadoEn,
    });
  }

  private toOrm(di: Partial<DevolucionItem>): Partial<DevolucionItemOrmEntity> {
    return {
      ...(di.devolucionId      !== undefined && { devolucion:      { id: di.devolucionId } as any }),
      ...(di.prestamoItemId    !== undefined && { prestamoItem:    { id: di.prestamoItemId } as any }),
      ...(di.condicionDevuelta !== undefined && { condicionDevuelta: di.condicionDevuelta }),
      ...(di.observacion       !== undefined && { observacion:    di.observacion }),
      ...(di.conNovedad        !== undefined && { conNovedad:     di.conNovedad }),
    };
  }

  async create(di: DevolucionItem): Promise<DevolucionItem> {
    const orm = this.repo.create(this.toOrm(di));
    const saved = await this.repo.save(orm);
    return (await this.findOne(saved.id))!;
  }

  async findAll(): Promise<DevolucionItem[]> {
    const list = await this.repo.find({ relations: ['devolucion', 'prestamoItem'] });
    return list.map(this.toDomain.bind(this));
  }

  async findByDevolucion(devolucionId: string): Promise<DevolucionItem[]> {
    const list = await this.repo.find({
      where: { devolucion: { id: devolucionId } },
      relations: ['devolucion', 'prestamoItem'],
    });
    return list.map(this.toDomain.bind(this));
  }

  async findOne(id: string): Promise<DevolucionItem | null> {
    const found = await this.repo.findOne({ where: { id }, relations: ['devolucion', 'prestamoItem'] });
    return found ? this.toDomain(found) : null;
  }

  async update(id: string, di: Partial<DevolucionItem>): Promise<DevolucionItem> {
    await this.repo.update(id, this.toOrm(di));
    return (await this.findOne(id))!;
  }

  async remove(id: string): Promise<void> {
    await this.repo.delete(id);
  }
}
