import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PrestamoHistorialRepository } from '../../domain/prestamo_historial.repository';
import { PrestamoHistorial } from '../../domain/prestamo_historial.entity';
import { PrestamoHistorialOrmEntity } from './prestamo_historial.orm-entity';

@Injectable()
export class TypeOrmPrestamoHistorialRepository implements PrestamoHistorialRepository {
  constructor(
    @InjectRepository(PrestamoHistorialOrmEntity)
    private readonly repo: Repository<PrestamoHistorialOrmEntity>,
  ) {}

  private toDomain(orm: PrestamoHistorialOrmEntity): PrestamoHistorial {
    return new PrestamoHistorial({
      id:             orm.id,
      prestamoId:     orm.prestamoId,
      estadoAnterior: orm.estadoAnterior,
      estadoNuevo:    orm.estadoNuevo,
      usuarioId:      orm.usuarioId,
      observacion:    orm.observacion,
      creadoEn:       orm.creadoEn,
    });
  }

  async create(h: PrestamoHistorial): Promise<PrestamoHistorial> {
    const saved = await this.repo.save(
      this.repo.create({
        prestamoId:     h.prestamoId,
        estadoAnterior: h.estadoAnterior ?? null,
        estadoNuevo:    h.estadoNuevo,
        usuarioId:      h.usuarioId ?? null,
        observacion:    h.observacion ?? null,
      }),
    );
    return this.toDomain(saved);
  }

  async findByPrestamo(prestamoId: string): Promise<PrestamoHistorial[]> {
    const list = await this.repo.find({
      where: { prestamoId },
      order: { creadoEn: 'ASC' },
    });
    return list.map(this.toDomain.bind(this));
  }
}
