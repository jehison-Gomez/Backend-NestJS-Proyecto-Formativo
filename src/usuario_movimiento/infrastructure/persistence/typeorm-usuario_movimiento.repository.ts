import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Usuario_movimientoRepository } from '../../domain/usuario_movimiento.repository';
import { Usuario_movimiento } from '../../domain/usuario_movimiento.entity';
import { Usuario_movimientoOrmEntity } from './usuario_movimiento.orm-entity';
import { Usuario } from 'src/usuarios/domain/usuario.entity';
import { Movimiento } from 'src/movimientos/domain/movimiento.entity';

@Injectable()
export class TypeOrmUsuario_movimientoRepository implements Usuario_movimientoRepository {
  constructor(
    @InjectRepository(Usuario_movimientoOrmEntity)
    private readonly repo: Repository<Usuario_movimientoOrmEntity>,
  ) {}

  private toDomain(orm: Usuario_movimientoOrmEntity): Usuario_movimiento {
    return new Usuario_movimiento({
      id:     orm.id,
      estado: orm.estado,
      usuario: orm.usuario ? new Usuario({
        id:              orm.usuario.id,
        nombre:          orm.usuario.nombre,
        correo:          orm.usuario.correo,
        numeroDocumento: orm.usuario.numeroDocumento,
        telefono:        orm.usuario.telefono,
        estado:          orm.usuario.estado,
      }) : undefined,
      movimiento: orm.movimiento ? new Movimiento({
        id:          orm.movimiento.id,
        tipo:        orm.movimiento.tipo,
        cantidad:    Number(orm.movimiento.cantidad),
        descripcion: orm.movimiento.descripcion,
        estado:      orm.movimiento.estado,
      }) : undefined,
      creadoEn:      orm.creadoEn,
      actualizadoEn: orm.actualizadoEn,
    });
  }

  private toOrm(um: Partial<Usuario_movimiento>): Partial<Usuario_movimientoOrmEntity> {
    return {
      ...(um.estado     !== undefined && { estado:     um.estado }),
      ...(um.usuario    !== undefined && { usuario:    { id: um.usuario.id } as any }),
      ...(um.movimiento !== undefined && { movimiento: { id: um.movimiento.id } as any }),
    };
  }

  async create(um: Usuario_movimiento): Promise<Usuario_movimiento> {
    const ormEntity = this.repo.create(this.toOrm(um));
    const saved = await this.repo.save(ormEntity);
    return (await this.findOne(saved.id))!;
  }

  async findAll(): Promise<Usuario_movimiento[]> {
    const list = await this.repo.find({ relations: ['usuario', 'movimiento'] });
    return list.map(this.toDomain.bind(this));
  }

  async findOne(id: string): Promise<Usuario_movimiento | null> {
    const found = await this.repo.findOne({ where: { id }, relations: ['usuario', 'movimiento'] });
    return found ? this.toDomain(found) : null;
  }

  async update(id: string, um: Partial<Usuario_movimiento>): Promise<Usuario_movimiento> {
    await this.repo.update(id, this.toOrm(um));
    return (await this.findOne(id))!;
  }

  async remove(id: string): Promise<void> {
    await this.repo.delete(id);
  }
}
