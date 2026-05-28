import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { KardexRepository } from '../../domain/kardex.repository';
import { Kardex } from '../../domain/kardex.entity';
import { KardexOrmEntity } from './kardex.orm-entity';
import { Ficha } from 'src/fichas/domain/ficha.entity';
import { Prestamo } from 'src/prestamos/domain/prestamo.entity';
import { Usuario } from 'src/usuarios/domain/usuario.entity';
import { Materiale } from 'src/materiales/domain/materiale.entity';
import { Ubicacion } from 'src/ubicacion/domain/ubicacion.entity';
import { Movimiento } from 'src/movimientos/domain/movimiento.entity';

const RELATIONS = ['ficha', 'prestamo', 'usuario', 'material', 'ubicacion', 'movimiento'];

@Injectable()
export class TypeOrmKardexRepository implements KardexRepository {
  constructor(
    @InjectRepository(KardexOrmEntity)
    private readonly repo: Repository<KardexOrmEntity>,
  ) {}

  private toDomain(orm: KardexOrmEntity): Kardex {
    return new Kardex({
      id:               orm.id,
      cantidad:         Number(orm.cantidad),
      cantidadAnterior: Number(orm.cantidadAnterior),
      cantidadActual:   Number(orm.cantidadActual),
      estado:           orm.estado,
      ficha: orm.ficha ? new Ficha({
        id:          orm.ficha.id,
        codigoFicha: orm.ficha.codigoFicha,
        fechaInicio: orm.ficha.fechaInicio,
        fechaFin:    orm.ficha.fechaFin,
        estado:      orm.ficha.estado,
      }) : undefined,
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
      material: orm.material ? new Materiale({
        id:          orm.material.id,
        nombre:      orm.material.nombre,
        descripcion: orm.material.descripcion,
        estado:      orm.material.estado,
      }) : undefined,
      ubicacion: orm.ubicacion ? new Ubicacion({
        id:          orm.ubicacion.id,
        nombre:      orm.ubicacion.nombre,
        descripcion: orm.ubicacion.descripcion,
        estado:      orm.ubicacion.estado,
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

  private toOrm(k: Partial<Kardex>): Partial<KardexOrmEntity> {
    return {
      ...(k.cantidad         !== undefined && { cantidad:         k.cantidad }),
      ...(k.cantidadAnterior !== undefined && { cantidadAnterior: k.cantidadAnterior }),
      ...(k.cantidadActual   !== undefined && { cantidadActual:   k.cantidadActual }),
      ...(k.estado           !== undefined && { estado:           k.estado }),
      ...(k.ficha            !== undefined && { ficha:            { id: k.ficha.id } as any }),
      ...(k.prestamo         !== undefined && { prestamo:         { id: k.prestamo.id } as any }),
      ...(k.usuario          !== undefined && { usuario:          { id: k.usuario.id } as any }),
      ...(k.material         !== undefined && { material:         { id: k.material.id } as any }),
      ...(k.ubicacion        !== undefined && { ubicacion:        { id: k.ubicacion.id } as any }),
      ...(k.movimiento       !== undefined && { movimiento:       { id: k.movimiento.id } as any }),
    };
  }

  async create(kardex: Kardex): Promise<Kardex> {
    const ormEntity = this.repo.create(this.toOrm(kardex));
    const saved = await this.repo.save(ormEntity);
    return (await this.findOne(saved.id))!;
  }

  async findAll(): Promise<Kardex[]> {
    const list = await this.repo.find({ relations: RELATIONS });
    return list.map(this.toDomain.bind(this));
  }

  async findOne(id: string): Promise<Kardex | null> {
    const found = await this.repo.findOne({ where: { id }, relations: RELATIONS });
    return found ? this.toDomain(found) : null;
  }

  async update(id: string, kardex: Partial<Kardex>): Promise<Kardex> {
    await this.repo.update(id, this.toOrm(kardex));
    return (await this.findOne(id))!;
  }

  async remove(id: string): Promise<void> {
    await this.repo.delete(id);
  }
}
