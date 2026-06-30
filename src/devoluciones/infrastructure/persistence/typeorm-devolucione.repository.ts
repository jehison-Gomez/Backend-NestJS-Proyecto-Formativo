import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DevolucioneRepository } from '../../domain/devolucione.repository';
import { Devolucione } from '../../domain/devolucione.entity';
import { DevolucioneOrmEntity } from './devolucione.orm-entity';
import { Usuario } from 'src/usuarios/domain/usuario.entity';

@Injectable()
export class TypeOrmDevolucioneRepository implements DevolucioneRepository {
  constructor(
    @InjectRepository(DevolucioneOrmEntity)
    private readonly repo: Repository<DevolucioneOrmEntity>,
  ) {}

  private toDomain(orm: DevolucioneOrmEntity): Devolucione {
    return new Devolucione({
      id:              orm.id,
      fechaDevolucion: orm.fechaDevolucion,
      observacion:     orm.observacion,
      estado:          orm.estado,
      prestamoId:      orm.prestamo?.id,
      recibidoPor: orm.recibidoPor ? new Usuario({
        id:              orm.recibidoPor.id,
        nombre:          orm.recibidoPor.nombre,
        correo:          orm.recibidoPor.correo,
        numeroDocumento: orm.recibidoPor.numeroDocumento,
        telefono:        orm.recibidoPor.telefono,
        estado:          orm.recibidoPor.estado,
      }) : undefined,
      creadoEn:      orm.creadoEn,
      actualizadoEn: orm.actualizadoEn,
    });
  }

  private toOrm(d: Partial<Devolucione>): Partial<DevolucioneOrmEntity> {
    return {
      ...(d.fechaDevolucion !== undefined && { fechaDevolucion: d.fechaDevolucion }),
      ...(d.observacion     !== undefined && { observacion:     d.observacion }),
      ...(d.estado          !== undefined && { estado:          d.estado }),
      ...(d.prestamoId      !== undefined && { prestamo:        { id: d.prestamoId } as any }),
      ...(d.recibidoPor     !== undefined && { recibidoPor:     { id: d.recibidoPor.id } as any }),
    };
  }

  async create(devolucione: Devolucione): Promise<Devolucione> {
    const ormEntity = this.repo.create(this.toOrm(devolucione));
    const saved = await this.repo.save(ormEntity);
    return (await this.findOne(saved.id))!;
  }

  async findAll(): Promise<Devolucione[]> {
    const list = await this.repo.find({ relations: ['prestamo', 'recibidoPor'] });
    return list.map(this.toDomain.bind(this));
  }

  async findOne(id: string): Promise<Devolucione | null> {
    const found = await this.repo.findOne({ where: { id }, relations: ['prestamo', 'recibidoPor'] });
    return found ? this.toDomain(found) : null;
  }

  async update(id: string, devolucione: Partial<Devolucione>): Promise<Devolucione> {
    await this.repo.update(id, this.toOrm(devolucione));
    return (await this.findOne(id))!;
  }

  async remove(id: string): Promise<void> {
    await this.repo.delete(id);
  }
}
