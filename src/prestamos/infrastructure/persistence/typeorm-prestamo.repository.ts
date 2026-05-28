import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PrestamoRepository } from '../../domain/prestamo.repository';
import { Prestamo } from '../../domain/prestamo.entity';
import { PrestamoOrmEntity } from './prestamo.orm-entity';
import { Usuario } from 'src/usuarios/domain/usuario.entity';
import { Ficha } from 'src/fichas/domain/ficha.entity';

@Injectable()
export class TypeOrmPrestamoRepository implements PrestamoRepository {
  constructor(
    @InjectRepository(PrestamoOrmEntity)
    private readonly repo: Repository<PrestamoOrmEntity>,
  ) {}

  private toDomain(orm: PrestamoOrmEntity): Prestamo {
    return new Prestamo({
      id:            orm.id,
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
      creadoEn:      orm.creadoEn,
      actualizadoEn: orm.actualizadoEn,
    });
  }

  private toOrm(prestamo: Partial<Prestamo>): Partial<PrestamoOrmEntity> {
    return {
      ...(prestamo.observacion !== undefined && { observacion: prestamo.observacion }),
      ...(prestamo.fechaInicio !== undefined && { fechaInicio: prestamo.fechaInicio }),
      ...(prestamo.fechaFin    !== undefined && { fechaFin:    prestamo.fechaFin }),
      ...(prestamo.estado      !== undefined && { estado:      prestamo.estado }),
      ...(prestamo.usuario     !== undefined && { usuario:     { id: prestamo.usuario.id } as any }),
      ...(prestamo.ficha       !== undefined && { ficha:       { id: prestamo.ficha.id } as any }),
    };
  }

  async create(prestamo: Prestamo): Promise<Prestamo> {
    const ormEntity = this.repo.create(this.toOrm(prestamo));
    const saved = await this.repo.save(ormEntity);
    return (await this.findOne(saved.id))!;
  }

  async findAll(): Promise<Prestamo[]> {
    const list = await this.repo.find({ relations: ['usuario', 'ficha'] });
    return list.map(this.toDomain.bind(this));
  }

  async findOne(id: string): Promise<Prestamo | null> {
    const found = await this.repo.findOne({ where: { id }, relations: ['usuario', 'ficha'] });
    return found ? this.toDomain(found) : null;
  }

  async update(id: string, prestamo: Partial<Prestamo>): Promise<Prestamo> {
    await this.repo.update(id, this.toOrm(prestamo));
    return (await this.findOne(id))!;
  }

  async remove(id: string): Promise<void> {
    await this.repo.delete(id);
  }
}
