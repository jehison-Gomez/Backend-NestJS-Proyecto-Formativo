import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MovimientoRepository } from '../../domain/movimiento.repository';
import { Movimiento } from '../../domain/movimiento.entity';
import { MovimientoOrmEntity } from './movimiento.orm-entity';
import { Prestamo } from 'src/prestamos/domain/prestamo.entity';

@Injectable()
export class TypeOrmMovimientoRepository implements MovimientoRepository {
  constructor(
    @InjectRepository(MovimientoOrmEntity)
    private readonly repo: Repository<MovimientoOrmEntity>,
  ) {}

  private toDomain(orm: MovimientoOrmEntity): Movimiento {
    return new Movimiento({
      id:          orm.id,
      tipo:        orm.tipo,
      cantidad:    Number(orm.cantidad),
      descripcion: orm.descripcion,
      estado:      orm.estado,
      prestamo: orm.prestamo ? new Prestamo({
        id:            orm.prestamo.id,
        observacion:   orm.prestamo.observacion,
        fechaRegistro: orm.prestamo.fechaRegistro,
        fechaInicio:   orm.prestamo.fechaInicio,
        fechaFin:      orm.prestamo.fechaFin,
        estado:        orm.prestamo.estado,
      }) : undefined,
      materialItem: orm.materialItem ? { id: orm.materialItem.id } as any : undefined,
      creadoEn:      orm.creadoEn,
      actualizadoEn: orm.actualizadoEn,
    });
  }

  private toOrm(m: Partial<Movimiento>): Partial<MovimientoOrmEntity> {
    return {
      ...(m.tipo         !== undefined && { tipo:         m.tipo }),
      ...(m.cantidad     !== undefined && { cantidad:     m.cantidad }),
      ...(m.descripcion  !== undefined && { descripcion:  m.descripcion }),
      ...(m.estado       !== undefined && { estado:       m.estado }),
      ...(m.prestamo     !== undefined && { prestamo:     { id: m.prestamo.id } as any }),
      ...(m.materialItem !== undefined && { materialItem: { id: m.materialItem.id } as any }),
    };
  }

  async create(movimiento: Movimiento): Promise<Movimiento> {
    const ormEntity = this.repo.create(this.toOrm(movimiento));
    const saved = await this.repo.save(ormEntity);
    return (await this.findOne(saved.id))!;
  }

  async findAll(): Promise<Movimiento[]> {
    const list = await this.repo.find({ relations: ['prestamo', 'materialItem'] });
    return list.map(this.toDomain.bind(this));
  }

  async findOne(id: string): Promise<Movimiento | null> {
    const found = await this.repo.findOne({ where: { id }, relations: ['prestamo', 'materialItem'] });
    return found ? this.toDomain(found) : null;
  }

  async findByMaterialItem(materialItemId: string): Promise<Movimiento[]> {
    const list = await this.repo.find({
      where: { materialItem: { id: materialItemId } },
      relations: ['prestamo', 'materialItem'],
      order: { creadoEn: 'ASC' },
    });
    return list.map(this.toDomain.bind(this));
  }

  async update(id: string, movimiento: Partial<Movimiento>): Promise<Movimiento> {
    await this.repo.update(id, this.toOrm(movimiento));
    return (await this.findOne(id))!;
  }

  async remove(id: string): Promise<void> {
    await this.repo.delete(id);
  }
}
