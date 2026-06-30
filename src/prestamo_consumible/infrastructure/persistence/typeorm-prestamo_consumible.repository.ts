import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PrestamoConsumibleRepository } from '../../domain/prestamo_consumible.repository';
import { PrestamoConsumible } from '../../domain/prestamo_consumible.entity';
import { PrestamoConsumibleOrmEntity } from './prestamo_consumible.orm-entity';

@Injectable()
export class TypeOrmPrestamoConsumibleRepository implements PrestamoConsumibleRepository {
  constructor(
    @InjectRepository(PrestamoConsumibleOrmEntity)
    private readonly repo: Repository<PrestamoConsumibleOrmEntity>,
  ) {}

  private toDomain(orm: PrestamoConsumibleOrmEntity): PrestamoConsumible {
    return new PrestamoConsumible({
      id:                   orm.id,
      prestamoId:           orm.prestamo?.id,
      materialConsumibleId: orm.materialConsumible?.id,
      cantidadSolicitada:   Number(orm.cantidadSolicitada),
      cantidadAprobada:     orm.cantidadAprobada !== null ? Number(orm.cantidadAprobada) : null,
      observacion:          orm.observacion ?? undefined,
      estado:               orm.estado,
      creadoEn:             orm.creadoEn,
      actualizadoEn:        orm.actualizadoEn,
    });
  }

  private toOrm(pc: Partial<PrestamoConsumible>): Partial<PrestamoConsumibleOrmEntity> {
    return {
      ...(pc.prestamoId           !== undefined && { prestamo:           { id: pc.prestamoId } as any }),
      ...(pc.materialConsumibleId !== undefined && { materialConsumible: { id: pc.materialConsumibleId } as any }),
      ...(pc.cantidadSolicitada   !== undefined && { cantidadSolicitada: pc.cantidadSolicitada }),
      ...(pc.cantidadAprobada     !== undefined && { cantidadAprobada:   pc.cantidadAprobada }),
      ...(pc.observacion          !== undefined && { observacion:        pc.observacion }),
      ...(pc.estado               !== undefined && { estado:             pc.estado }),
    };
  }

  async create(pc: PrestamoConsumible): Promise<PrestamoConsumible> {
    const orm = this.repo.create(this.toOrm(pc));
    const saved = await this.repo.save(orm);
    return (await this.findOne(saved.id))!;
  }

  async findAll(): Promise<PrestamoConsumible[]> {
    const list = await this.repo.find({ relations: ['prestamo', 'materialConsumible'] });
    return list.map(this.toDomain.bind(this));
  }

  async findByPrestamo(prestamoId: string): Promise<PrestamoConsumible[]> {
    const list = await this.repo.find({
      where: { prestamo: { id: prestamoId } },
      relations: ['prestamo', 'materialConsumible'],
    });
    return list.map(this.toDomain.bind(this));
  }

  async findOne(id: string): Promise<PrestamoConsumible | null> {
    const found = await this.repo.findOne({ where: { id }, relations: ['prestamo', 'materialConsumible'] });
    return found ? this.toDomain(found) : null;
  }

  async update(id: string, pc: Partial<PrestamoConsumible>): Promise<PrestamoConsumible> {
    await this.repo.update(id, this.toOrm(pc));
    return (await this.findOne(id))!;
  }

  async remove(id: string): Promise<void> {
    await this.repo.delete(id);
  }
}
