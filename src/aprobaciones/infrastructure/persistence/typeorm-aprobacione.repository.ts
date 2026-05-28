import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AprobacioneRepository } from '../../domain/aprobacione.repository';
import { Aprobacione } from '../../domain/aprobacione.entity';
import { AprobacioneOrmEntity } from './aprobacione.orm-entity';
import { Prestamo } from 'src/prestamos/domain/prestamo.entity';
import { Usuario } from 'src/usuarios/domain/usuario.entity';

@Injectable()
export class TypeOrmAprobacioneRepository implements AprobacioneRepository {
  constructor(
    @InjectRepository(AprobacioneOrmEntity)
    private readonly repo: Repository<AprobacioneOrmEntity>,
  ) {}

  private toDomain(orm: AprobacioneOrmEntity): Aprobacione {
    return new Aprobacione({
      id:          orm.id,
      decision:    orm.decision,
      observacion: orm.observacion,
      estado:      orm.estado,
      prestamo: orm.prestamo ? new Prestamo({
        id:            orm.prestamo.id,
        observacion:   orm.prestamo.observacion,
        fechaRegistro: orm.prestamo.fechaRegistro,
        fechaInicio:   orm.prestamo.fechaInicio,
        fechaFin:      orm.prestamo.fechaFin,
        estado:        orm.prestamo.estado,
      }) : undefined,
      usuario: orm.usuario ? new Usuario({
        id:              orm.usuario.id,
        nombre:          orm.usuario.nombre,
        correo:          orm.usuario.correo,
        numeroDocumento: orm.usuario.numeroDocumento,
        telefono:        orm.usuario.telefono,
        estado:          orm.usuario.estado,
      }) : undefined,
      creadoEn:      orm.creadoEn,
      actualizadoEn: orm.actualizadoEn,
    });
  }

  private toOrm(aprobacione: Partial<Aprobacione>): Partial<AprobacioneOrmEntity> {
    return {
      ...(aprobacione.decision    !== undefined && { decision:    aprobacione.decision }),
      ...(aprobacione.observacion !== undefined && { observacion: aprobacione.observacion }),
      ...(aprobacione.estado      !== undefined && { estado:      aprobacione.estado }),
      ...(aprobacione.prestamo    !== undefined && { prestamo:    { id: aprobacione.prestamo.id } as any }),
      ...(aprobacione.usuario     !== undefined && { usuario:     { id: aprobacione.usuario.id } as any }),
    };
  }

  async create(aprobacione: Aprobacione): Promise<Aprobacione> {
    const ormEntity = this.repo.create(this.toOrm(aprobacione));
    const saved = await this.repo.save(ormEntity);
    return (await this.findOne(saved.id))!;
  }

  async findAll(): Promise<Aprobacione[]> {
    const list = await this.repo.find({ relations: ['prestamo', 'usuario'] });
    return list.map(this.toDomain.bind(this));
  }

  async findOne(id: string): Promise<Aprobacione | null> {
    const found = await this.repo.findOne({ where: { id }, relations: ['prestamo', 'usuario'] });
    return found ? this.toDomain(found) : null;
  }

  async update(id: string, aprobacione: Partial<Aprobacione>): Promise<Aprobacione> {
    await this.repo.update(id, this.toOrm(aprobacione));
    return (await this.findOne(id))!;
  }

  async remove(id: string): Promise<void> {
    await this.repo.delete(id);
  }
}
