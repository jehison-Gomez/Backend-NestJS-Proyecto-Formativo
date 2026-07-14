import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FichaRepository } from '../../domain/ficha.repository';
import { Ficha } from '../../domain/ficha.entity';
import { FichaOrmEntity } from './ficha.orm-entity';
import { Programa } from 'src/programas/domain/programa.entity';
import { Usuario } from 'src/usuarios/domain/usuario.entity';

@Injectable()
export class TypeOrmFichaRepository implements FichaRepository {
  constructor(
    @InjectRepository(FichaOrmEntity)
    private readonly repo: Repository<FichaOrmEntity>,
  ) {}

  private toDomain(orm: FichaOrmEntity): Ficha {
    return new Ficha({
      id: orm.id,
      codigoFicha: orm.codigoFicha,
      fechaInicio: orm.fechaInicio,
      fechaFin: orm.fechaFin,
      estado: orm.estado,
      programa: orm.programa ? new Programa({
        id: orm.programa.id,
        nombre: orm.programa.nombre,
        codigo: orm.programa.codigo,
        nivelFormacion: orm.programa.nivelFormacion,
        estado: orm.programa.estado,
      }) : undefined,
      usuarioLider: orm.usuarioLider ? new Usuario({
        id: orm.usuarioLider.id,
        nombre: orm.usuarioLider.nombre,
        correo: orm.usuarioLider.correo,
        estado: orm.usuarioLider.estado,
      }) : undefined,
      aprendices: orm.aprendices?.map(u => new Usuario({
        id: u.id,
        nombre: u.nombre,
        correo: u.correo,
        estado: u.estado,
      })),
      creadoEn: orm.creadoEn,
      actualizadoEn: orm.actualizadoEn,
    });
  }

  private toOrm(ficha: Partial<Ficha>): Partial<FichaOrmEntity> {
    return {
      ...(ficha.codigoFicha !== undefined && { codigoFicha: ficha.codigoFicha }),
      ...(ficha.fechaInicio !== undefined && { fechaInicio: ficha.fechaInicio }),
      ...(ficha.fechaFin !== undefined && { fechaFin: ficha.fechaFin }),
      ...(ficha.estado !== undefined && { estado: ficha.estado }),
      ...(ficha.programa !== undefined && { programa: { id: ficha.programa.id } as any }),
      ...(ficha.usuarioLider !== undefined && { usuarioLider: { id: ficha.usuarioLider.id } as any }),
    };
  }

  async create(ficha: Ficha): Promise<Ficha> {
    const ormEntity = this.repo.create(this.toOrm(ficha));
    const saved = await this.repo.save(ormEntity);
    const result = await this.findOne(saved.id);
    return result!;
  }

  async findAll(sedeId?: string | null): Promise<Ficha[]> {
    const query = this.repo.createQueryBuilder('ficha')
      .leftJoinAndSelect('ficha.programa', 'programa')
      .leftJoinAndSelect('ficha.usuarioLider', 'usuarioLider')
      .leftJoinAndSelect('ficha.aprendices', 'aprendices')
      .leftJoin('programa.area', 'area')
      .leftJoin('area.sede', 'sede');

    if (sedeId !== undefined) {
      query.where(sedeId ? 'sede.id = :sedeId' : '1 = 0', sedeId ? { sedeId } : {});
    }

    const list = await query.getMany();
    return list.map(this.toDomain.bind(this));
  }

  async findOne(id: string): Promise<Ficha | null> {
    const found = await this.repo.findOne({
      where: { id },
      relations: ['programa', 'usuarioLider', 'aprendices'],
    });
    return found ? this.toDomain(found) : null;
  }

  async findSedeIdByFichaId(fichaId: string): Promise<string | null> {
    const result = await this.repo.createQueryBuilder('ficha')
      .leftJoin('ficha.programa', 'programa')
      .leftJoin('programa.area', 'area')
      .leftJoin('area.sede', 'sede')
      .select('sede.id', 'sedeId')
      .where('ficha.id = :fichaId', { fichaId })
      .getRawOne();
    return result?.sedeId ?? null;
  }

  async update(id: string, ficha: Partial<Ficha>): Promise<Ficha> {
    await this.repo.update(id, this.toOrm(ficha));
    const result = await this.findOne(id);
    return result!;
  }

  async remove(id: string): Promise<void> {
    await this.repo.delete(id);
  }
}
