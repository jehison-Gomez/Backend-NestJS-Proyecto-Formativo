import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { KardexRepository } from '../../domain/kardex.repository';
import { Kardex } from '../../domain/kardex.entity';
import { KardexOrmEntity } from './kardex.orm-entity';

@Injectable()
export class TypeOrmKardexRepository implements KardexRepository {
  constructor(
    @InjectRepository(KardexOrmEntity)
    private readonly repo: Repository<KardexOrmEntity>,
  ) {}

  private toDomain(orm: KardexOrmEntity): Kardex {
    return new Kardex({
      id:                   orm.id,
      movimientoId:         orm.movimiento?.id,
      fichaId:              orm.ficha?.id,
      usuarioId:            orm.usuario?.id,
      prestamoId:           orm.prestamo?.id ?? null,
      devolucionId:         orm.devolucion?.id ?? null,
      materialConsumibleId: orm.materialConsumible?.id ?? null,
      materialItemId:       orm.materialItem?.id ?? null,
      cantidad:             Number(orm.cantidad),
      saldoAnterior:        orm.saldoAnterior !== null ? Number(orm.saldoAnterior) : null,
      saldoActual:          orm.saldoActual   !== null ? Number(orm.saldoActual)   : null,
      estado:               orm.estado,
      creadoEn:             orm.creadoEn,
      actualizadoEn:        orm.actualizadoEn,
    });
  }

  private toOrm(k: Partial<Kardex>): Partial<KardexOrmEntity> {
    return {
      ...(k.movimientoId         !== undefined && { movimiento:         { id: k.movimientoId } as any }),
      ...(k.fichaId              !== undefined && { ficha:              { id: k.fichaId } as any }),
      ...(k.usuarioId            !== undefined && { usuario:            { id: k.usuarioId } as any }),
      ...(k.prestamoId           !== undefined && { prestamo:           k.prestamoId ? { id: k.prestamoId } as any : null }),
      ...(k.devolucionId         !== undefined && { devolucion:         k.devolucionId ? { id: k.devolucionId } as any : null }),
      ...(k.materialConsumibleId !== undefined && { materialConsumible: k.materialConsumibleId ? { id: k.materialConsumibleId } as any : null }),
      ...(k.materialItemId       !== undefined && { materialItem:       k.materialItemId ? { id: k.materialItemId } as any : null }),
      ...(k.cantidad             !== undefined && { cantidad:           k.cantidad }),
      ...(k.saldoAnterior        !== undefined && { saldoAnterior:      k.saldoAnterior }),
      ...(k.saldoActual          !== undefined && { saldoActual:        k.saldoActual }),
      ...(k.estado               !== undefined && { estado:             k.estado }),
    };
  }

  async create(kardex: Kardex): Promise<Kardex> {
    const orm = this.repo.create(this.toOrm(kardex));
    const saved = await this.repo.save(orm);
    return (await this.findOne(saved.id))!;
  }

  async findAll(): Promise<Kardex[]> {
    const list = await this.repo.find({
      relations: ['movimiento', 'ficha', 'usuario', 'prestamo', 'devolucion', 'materialConsumible', 'materialItem'],
    });
    return list.map(this.toDomain.bind(this));
  }

  async findByMaterialConsumible(materialConsumibleId: string): Promise<Kardex[]> {
    const list = await this.repo.find({
      where: { materialConsumible: { id: materialConsumibleId } },
      relations: ['movimiento', 'ficha', 'usuario', 'prestamo', 'materialConsumible'],
      order: { creadoEn: 'ASC' },
    });
    return list.map(this.toDomain.bind(this));
  }

  async findByMaterialItem(materialItemId: string): Promise<Kardex[]> {
    const list = await this.repo.find({
      where: { materialItem: { id: materialItemId } },
      relations: ['movimiento', 'ficha', 'usuario', 'prestamo', 'devolucion', 'materialItem'],
      order: { creadoEn: 'ASC' },
    });
    return list.map(this.toDomain.bind(this));
  }

  async getLastSaldo(materialConsumibleId: string): Promise<number> {
    const last = await this.repo.findOne({
      where: { materialConsumible: { id: materialConsumibleId } },
      order: { creadoEn: 'DESC' },
    });
    return last?.saldoActual !== null && last?.saldoActual !== undefined ? Number(last.saldoActual) : 0;
  }

  async findOne(id: string): Promise<Kardex | null> {
    const found = await this.repo.findOne({
      where: { id },
      relations: ['movimiento', 'ficha', 'usuario', 'prestamo', 'devolucion', 'materialConsumible', 'materialItem'],
    });
    return found ? this.toDomain(found) : null;
  }

  async update(id: string, kardex: Partial<Kardex>): Promise<Kardex> {
    await this.repo.update(id, this.toOrm(kardex));
    return (await this.findOne(id))!;
  }

  async remove(id: string): Promise<void> {
    await this.repo.delete(id);
  }
}
