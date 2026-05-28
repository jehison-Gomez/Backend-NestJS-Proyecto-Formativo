import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Prestamo_materialRepository } from '../../domain/prestamo_material.repository';
import { Prestamo_material } from '../../domain/prestamo_material.entity';
import { Prestamo_materialOrmEntity } from './prestamo_material.orm-entity';
import { Prestamo } from 'src/prestamos/domain/prestamo.entity';
import { Materiale } from 'src/materiales/domain/materiale.entity';
import { Devolucione } from 'src/devoluciones/domain/devolucione.entity';

const RELATIONS = ['prestamo', 'material', 'devolucion'];

@Injectable()
export class TypeOrmPrestamo_materialRepository implements Prestamo_materialRepository {
  constructor(
    @InjectRepository(Prestamo_materialOrmEntity)
    private readonly repo: Repository<Prestamo_materialOrmEntity>,
  ) {}

  private toDomain(orm: Prestamo_materialOrmEntity): Prestamo_material {
    return new Prestamo_material({
      id:       orm.id,
      cantidad: Number(orm.cantidad),
      estado:   orm.estado,
      prestamo: orm.prestamo ? new Prestamo({
        id:            orm.prestamo.id,
        observacion:   orm.prestamo.observacion,
        fechaRegistro: orm.prestamo.fechaRegistro,
        fechaInicio:   orm.prestamo.fechaInicio,
        fechaFin:      orm.prestamo.fechaFin,
        estado:        orm.prestamo.estado,
      }) : undefined,
      material: orm.material ? new Materiale({
        id:          orm.material.id,
        nombre:      orm.material.nombre,
        descripcion: orm.material.descripcion,
        estado:      orm.material.estado,
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

  private toOrm(pm: Partial<Prestamo_material>): Partial<Prestamo_materialOrmEntity> {
    return {
      ...(pm.cantidad   !== undefined && { cantidad:   pm.cantidad }),
      ...(pm.estado     !== undefined && { estado:     pm.estado }),
      ...(pm.prestamo   !== undefined && { prestamo:   { id: pm.prestamo.id } as any }),
      ...(pm.material   !== undefined && { material:   { id: pm.material.id } as any }),
      ...(pm.devolucion !== undefined && { devolucion: pm.devolucion ? { id: pm.devolucion.id } as any : null }),
    };
  }

  async create(prestamo_material: Prestamo_material): Promise<Prestamo_material> {
    const ormEntity = this.repo.create(this.toOrm(prestamo_material));
    const saved = await this.repo.save(ormEntity);
    return (await this.findOne(saved.id))!;
  }

  async findAll(): Promise<Prestamo_material[]> {
    const list = await this.repo.find({ relations: RELATIONS });
    return list.map(this.toDomain.bind(this));
  }

  async findOne(id: string): Promise<Prestamo_material | null> {
    const found = await this.repo.findOne({ where: { id }, relations: RELATIONS });
    return found ? this.toDomain(found) : null;
  }

  async update(id: string, prestamo_material: Partial<Prestamo_material>): Promise<Prestamo_material> {
    await this.repo.update(id, this.toOrm(prestamo_material));
    return (await this.findOne(id))!;
  }

  async remove(id: string): Promise<void> {
    await this.repo.delete(id);
  }
}
