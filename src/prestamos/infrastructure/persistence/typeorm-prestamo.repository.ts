import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PrestamoRepository } from '../../domain/prestamo.repository';
import { Prestamo, PrestamoConsumibleDetalle } from '../../domain/prestamo.entity';
import { PrestamoOrmEntity } from './prestamo.orm-entity';
import { PrestamoMaterialConsumibleOrmEntity } from './prestamo-material-consumible.orm-entity';
import { Usuario } from 'src/usuarios/domain/usuario.entity';
import { Ficha } from 'src/fichas/domain/ficha.entity';
import { Material_item } from 'src/material_item/domain/material_item.entity';

@Injectable()
export class TypeOrmPrestamoRepository implements PrestamoRepository {
  constructor(
    @InjectRepository(PrestamoOrmEntity)
    private readonly repo: Repository<PrestamoOrmEntity>,
    @InjectRepository(PrestamoMaterialConsumibleOrmEntity)
    private readonly pmcRepo: Repository<PrestamoMaterialConsumibleOrmEntity>,
  ) {}

  private toDomain(orm: PrestamoOrmEntity): Prestamo {
    const materialConsumibles: PrestamoConsumibleDetalle[] = (orm.materialConsumibles ?? []).map((pmc) => ({
      materiale:          { id: pmc.materiale?.id } as any,
      materialConsumible: {
        id:           pmc.materialConsumible?.id,
        stockActual:  Number(pmc.materialConsumible?.stockActual ?? 0),
        stockMinimo:  Number(pmc.materialConsumible?.stockMinimo ?? 0),
        unidadMedida: pmc.materialConsumible?.unidadMedida,
      } as any,
      cantidadPrestada: Number(pmc.cantidadPrestada),
    }));

    return new Prestamo({
      id:            orm.id,
      motivo:        orm.motivo,
      observacion:   orm.observacion,
      fechaRegistro: orm.fechaRegistro,
      fechaInicio:   orm.fechaInicio,
      fechaFin:      orm.fechaFin,
      estado:        orm.estado,
      usuario: orm.usuario ? new Usuario({
        id:              orm.usuario.id,
        nombre:          orm.usuario.nombre,
        correo:          orm.usuario.correo,
        numeroDocumento: orm.usuario.numeroDocumento,
        telefono:        orm.usuario.telefono,
        estado:          orm.usuario.estado,
      }) : undefined,
      ficha: orm.ficha ? new Ficha({
        id:          orm.ficha.id,
        codigoFicha: orm.ficha.codigoFicha,
        fechaInicio: orm.ficha.fechaInicio,
        fechaFin:    orm.ficha.fechaFin,
        estado:      orm.ficha.estado,
      }) : undefined,
      beneficiarios: (orm.beneficiarios ?? []).map((u) => new Usuario({
        id:              u.id,
        nombre:          u.nombre,
        correo:          u.correo,
        numeroDocumento: u.numeroDocumento,
        telefono:        u.telefono,
        estado:          u.estado,
      })),
      materialItems: (orm.materialItems ?? []).map((mi) => new Material_item({
        id:         mi.id,
        codigoSena: mi.codigoSena,
        condicion:  mi.condicion,
        estadoItem: mi.estadoItem,
        estado:     mi.estado,
      })),
      materialConsumibles,
      aprobadoPor: orm.aprobadoPor ? new Usuario({
        id:     orm.aprobadoPor.id,
        nombre: orm.aprobadoPor.nombre,
      }) : undefined,
      fechaAprobacion:  orm.fechaAprobacion,
      rechazadoPor: orm.rechazadoPor ? new Usuario({
        id:     orm.rechazadoPor.id,
        nombre: orm.rechazadoPor.nombre,
      }) : undefined,
      fechaRechazo:    orm.fechaRechazo,
      fechaEntrega:    orm.fechaEntrega,
      fechaDevolucion: orm.fechaDevolucion,
      creadoEn:      orm.creadoEn,
      actualizadoEn: orm.actualizadoEn,
    });
  }

  private toOrm(prestamo: Partial<Prestamo>): Partial<PrestamoOrmEntity> {
    return {
      ...(prestamo.motivo       !== undefined && { motivo:       prestamo.motivo }),
      ...(prestamo.observacion  !== undefined && { observacion:  prestamo.observacion }),
      ...(prestamo.fechaInicio  !== undefined && { fechaInicio:  prestamo.fechaInicio }),
      ...(prestamo.fechaFin     !== undefined && { fechaFin:     prestamo.fechaFin }),
      ...(prestamo.estado       !== undefined && { estado:       prestamo.estado }),
      ...(prestamo.usuario      !== undefined && { usuario:      { id: prestamo.usuario.id } as any }),
      ...(prestamo.ficha        !== undefined && { ficha:        { id: prestamo.ficha.id } as any }),
      ...(prestamo.beneficiarios !== undefined && {
        beneficiarios: prestamo.beneficiarios.map((u) => ({ id: u.id }) as any),
      }),
      ...(prestamo.materialItems !== undefined && {
        materialItems: prestamo.materialItems.map((mi) => ({ id: mi.id }) as any),
      }),
      ...(prestamo.aprobadoPor      !== undefined && { aprobadoPor:     { id: prestamo.aprobadoPor.id } as any }),
      ...(prestamo.fechaAprobacion  !== undefined && { fechaAprobacion:  prestamo.fechaAprobacion }),
      ...(prestamo.rechazadoPor     !== undefined && { rechazadoPor:    { id: prestamo.rechazadoPor.id } as any }),
      ...(prestamo.fechaRechazo     !== undefined && { fechaRechazo:     prestamo.fechaRechazo }),
      ...(prestamo.fechaEntrega     !== undefined && { fechaEntrega:     prestamo.fechaEntrega }),
      ...(prestamo.fechaDevolucion  !== undefined && { fechaDevolucion:  prestamo.fechaDevolucion }),
    };
  }

  private readonly RELATIONS = [
    'usuario', 'ficha', 'beneficiarios',
    'materialItems',
    'materialConsumibles', 'materialConsumibles.materiale',
    'materialConsumibles.materialConsumible',
    'aprobadoPor', 'rechazadoPor',
  ];

  async create(prestamo: Prestamo): Promise<Prestamo> {
    const ormEntity = this.repo.create(this.toOrm(prestamo));
    const saved = await this.repo.save(ormEntity);

    if (prestamo.materialConsumibles?.length) {
      for (const detalle of prestamo.materialConsumibles) {
        const pmc = this.pmcRepo.create({
          prestamo:           { id: saved.id } as any,
          materiale:          { id: detalle.materiale.id } as any,
          materialConsumible: { id: detalle.materialConsumible.id } as any,
          cantidadPrestada:   detalle.cantidadPrestada,
        });
        await this.pmcRepo.save(pmc);
      }
    }

    return (await this.findOne(saved.id))!;
  }

  async findAll(): Promise<Prestamo[]> {
    const list = await this.repo.find({ relations: this.RELATIONS });
    return list.map(this.toDomain.bind(this));
  }

  async findOne(id: string): Promise<Prestamo | null> {
    const found = await this.repo.findOne({ where: { id }, relations: this.RELATIONS });
    return found ? this.toDomain(found) : null;
  }

  async update(id: string, prestamo: Partial<Prestamo>): Promise<Prestamo> {
    await this.repo.save({ id, ...this.toOrm(prestamo) });
    return (await this.findOne(id))!;
  }

  async remove(id: string): Promise<void> {
    await this.repo.delete(id);
  }
}
