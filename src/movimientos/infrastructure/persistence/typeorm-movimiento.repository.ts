import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MovimientoRepository } from '../../domain/movimiento.repository';
import { Movimiento } from '../../domain/movimiento.entity';
import { MovimientoOrmEntity } from './movimiento.orm-entity';
import { Prestamo } from 'src/prestamos/domain/prestamo.entity';
import { Usuario } from 'src/usuarios/domain/usuario.entity';

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
      saldo:       Number(orm.saldo),
      estado:      orm.estado,
      prestamo: orm.prestamo ? new Prestamo({
        id:            orm.prestamo.id,
        observacion:   orm.prestamo.observacion,
        fechaRegistro: orm.prestamo.fechaRegistro,
        fechaInicio:   orm.prestamo.fechaInicio,
        fechaFin:      orm.prestamo.fechaFin,
        estado:        orm.prestamo.estado,
      }) : undefined,
      materialItem:       orm.materialItem       ? { id: orm.materialItem.id }       as any : undefined,
      materialConsumible: orm.materialConsumible ? { id: orm.materialConsumible.id } as any : undefined,
      usuario: orm.usuario ? new Usuario({
        id:     orm.usuario.id,
        nombre: orm.usuario.nombre,
      }) : undefined,
      creadoEn:      orm.creadoEn,
      actualizadoEn: orm.actualizadoEn,
    });
  }

  private toOrm(m: Partial<Movimiento>): Partial<MovimientoOrmEntity> {
    return {
      ...(m.tipo         !== undefined && { tipo:         m.tipo }),
      ...(m.cantidad     !== undefined && { cantidad:     m.cantidad }),
      ...(m.descripcion  !== undefined && { descripcion:  m.descripcion }),
      ...(m.saldo        !== undefined && { saldo:        m.saldo }),
      ...(m.estado       !== undefined && { estado:       m.estado }),
      ...(m.prestamo           !== undefined && { prestamo:           { id: m.prestamo.id }           as any }),
      ...(m.materialItem       !== undefined && { materialItem:       { id: m.materialItem.id }       as any }),
      ...(m.materialConsumible !== undefined && { materialConsumible: { id: m.materialConsumible.id } as any }),
      ...(m.usuario            !== undefined && { usuario:            { id: m.usuario.id }            as any }),
    };
  }

  async create(movimiento: Movimiento): Promise<Movimiento> {
    const ormEntity = this.repo.create(this.toOrm(movimiento));
    const saved = await this.repo.save(ormEntity);
    return (await this.findOne(saved.id))!;
  }

  private readonly RELATIONS = ['prestamo', 'materialItem', 'materialConsumible', 'usuario'];

  async findAll(): Promise<Movimiento[]> {
    const list = await this.repo.find({ relations: this.RELATIONS });
    return list.map(this.toDomain.bind(this));
  }

  async findOne(id: string): Promise<Movimiento | null> {
    const found = await this.repo.findOne({ where: { id }, relations: this.RELATIONS });
    return found ? this.toDomain(found) : null;
  }

  async findByMaterialItem(materialItemId: string): Promise<Movimiento[]> {
    const list = await this.repo.find({
      where: { materialItem: { id: materialItemId } },
      relations: this.RELATIONS,
      order: { creadoEn: 'ASC' },
    });
    return list.map(this.toDomain.bind(this));
  }

  async findByMaterialConsumible(materialConsumibleId: string): Promise<Movimiento[]> {
    const list = await this.repo.find({
      where: { materialConsumible: { id: materialConsumibleId } },
      relations: this.RELATIONS,
      order: { creadoEn: 'ASC' },
    });
    return list.map(this.toDomain.bind(this));
  }

  async getLastSaldo(materialItemId?: string, materialConsumibleId?: string): Promise<number> {
    if (!materialItemId && !materialConsumibleId) return 0;
    const where: any = materialItemId
      ? { materialItem: { id: materialItemId } }
      : { materialConsumible: { id: materialConsumibleId } };
    const last = await this.repo.findOne({ where, order: { creadoEn: 'DESC' } });
    return last ? Number(last.saldo) : 0;
  }

  async findByMateriale(materialeId: string): Promise<Movimiento[]> {
    const list = await this.repo
      .createQueryBuilder('mov')
      .leftJoinAndSelect('mov.prestamo',          'prestamo')
      .leftJoinAndSelect('mov.materialItem',       'mi')
      .leftJoinAndSelect('mov.materialConsumible', 'mc')
      .leftJoinAndSelect('mov.usuario',            'usuario')
      .where(qb => {
        const itemsSub = qb.subQuery()
          .select('item.id')
          .from('material_item', 'item')
          .where('item.materiale_id = :mid')
          .getQuery();
        const consumSub = qb.subQuery()
          .select('cons.id')
          .from('material_consumible', 'cons')
          .where('cons.materiale_id = :mid')
          .getQuery();
        return `mi.id IN ${itemsSub} OR mc.id IN ${consumSub}`;
      })
      .setParameter('mid', materialeId)
      .orderBy('mov.creadoEn', 'ASC')
      .getMany();
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
