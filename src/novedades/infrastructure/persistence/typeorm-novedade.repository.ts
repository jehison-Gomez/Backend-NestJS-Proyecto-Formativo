import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { NovedadeRepository } from '../../domain/novedade.repository';
import { Novedade } from '../../domain/novedade.entity';
import { NovedadeOrmEntity } from './novedade.orm-entity';
import { Usuario } from 'src/usuarios/domain/usuario.entity';
import { Devolucione } from 'src/devoluciones/domain/devolucione.entity';

@Injectable()
export class TypeOrmNovedadeRepository implements NovedadeRepository {
  constructor(
    @InjectRepository(NovedadeOrmEntity)
    private readonly repo: Repository<NovedadeOrmEntity>,
  ) {}

  private toDomain(orm: NovedadeOrmEntity): Novedade {
    return new Novedade({
      id:          orm.id,
      descripcion: orm.descripcion,
      tipo:        orm.tipo,
      estado:      orm.estado,
      usuario: orm.usuario ? new Usuario({
        id:              orm.usuario.id,
        nombre:          orm.usuario.nombre,
        correo:          orm.usuario.correo,
        numeroDocumento: orm.usuario.numeroDocumento,
        telefono:        orm.usuario.telefono,
        estado:          orm.usuario.estado,
      }) : undefined,
      devolucion: orm.devolucion ? new Devolucione({
        id:              orm.devolucion.id,
        fechaDevolucion: orm.devolucion.fechaDevolucion,
        observacion:     orm.devolucion.observacion,
        estado:          orm.devolucion.estado,
      }) : undefined,
      creadoEn:      orm.creadoEn,
      actualizadoEn: orm.actualizadoEn,
    });
  }

  private toOrm(n: Partial<Novedade>): Partial<NovedadeOrmEntity> {
    return {
      ...(n.descripcion !== undefined && { descripcion: n.descripcion }),
      ...(n.tipo        !== undefined && { tipo:        n.tipo }),
      ...(n.estado      !== undefined && { estado:      n.estado }),
      ...(n.usuario     !== undefined && { usuario:     { id: n.usuario.id } as any }),
      ...(n.devolucion  !== undefined && { devolucion:  { id: n.devolucion.id } as any }),
    };
  }

  async create(novedade: Novedade): Promise<Novedade> {
    const ormEntity = this.repo.create(this.toOrm(novedade));
    const saved = await this.repo.save(ormEntity);
    return (await this.findOne(saved.id))!;
  }

  async findAll(): Promise<Novedade[]> {
    const list = await this.repo.find({ relations: ['usuario', 'devolucion'] });
    return list.map(this.toDomain.bind(this));
  }

  async findOne(id: string): Promise<Novedade | null> {
    const found = await this.repo.findOne({ where: { id }, relations: ['usuario', 'devolucion'] });
    return found ? this.toDomain(found) : null;
  }

  async update(id: string, novedade: Partial<Novedade>): Promise<Novedade> {
    await this.repo.update(id, this.toOrm(novedade));
    return (await this.findOne(id))!;
  }

  async remove(id: string): Promise<void> {
    await this.repo.delete(id);
  }
}
