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

  private toOrm(d: Partial<Devolucione>): Partial<DevolucioneOrmEntity> {
    return {
      ...(d.fechaDevolucion !== undefined && { fechaDevolucion: d.fechaDevolucion }),
      ...(d.observacion     !== undefined && { observacion:     d.observacion }),
      ...(d.estado          !== undefined && { estado:          d.estado }),
      ...(d.usuario         !== undefined && { usuario:         { id: d.usuario.id } as any }),
    };
  }

  async create(devolucione: Devolucione): Promise<Devolucione> {
    const ormEntity = this.repo.create(this.toOrm(devolucione));
    const saved = await this.repo.save(ormEntity);
    return (await this.findOne(saved.id))!;
  }

  async findAll(): Promise<Devolucione[]> {
    const list = await this.repo.find({ relations: ['usuario'] });
    return list.map(this.toDomain.bind(this));
  }

  async findOne(id: string): Promise<Devolucione | null> {
    const found = await this.repo.findOne({ where: { id }, relations: ['usuario'] });
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
