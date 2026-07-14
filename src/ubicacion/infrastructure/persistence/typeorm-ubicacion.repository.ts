import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UbicacionRepository } from '../../domain/ubicacion.repository';
import { Ubicacion } from '../../domain/ubicacion.entity';
import { UbicacionOrmEntity } from './ubicacion.orm-entity';
import { Tipo_ubicacion } from 'src/tipo_ubicacion/domain/tipo_ubicacion.entity';
import { Area } from 'src/areas/domain/area.entity';
import { Usuario } from 'src/usuarios/domain/usuario.entity';

@Injectable()
export class TypeOrmUbicacionRepository implements UbicacionRepository {
  constructor(
    @InjectRepository(UbicacionOrmEntity)
    private readonly repo: Repository<UbicacionOrmEntity>,
  ) {}

  private toDomain(orm: UbicacionOrmEntity): Ubicacion {
    return new Ubicacion({
      id:          orm.id,
      nombre:      orm.nombre,
      descripcion: orm.descripcion,
      estado:      orm.estado,
      tipoUbicacion: orm.tipoUbicacion ? new Tipo_ubicacion({
        id:          orm.tipoUbicacion.id,
        nombre:      orm.tipoUbicacion.nombre,
        descripcion: orm.tipoUbicacion.descripcion,
        estado:      orm.tipoUbicacion.estado,
      }) : undefined,
      area: orm.area ? new Area({
        id:          orm.area.id,
        nombre:      orm.area.nombre,
        descripcion: orm.area.descripcion,
        estado:      orm.area.estado,
      }) : undefined,
      encargado: orm.encargado ? new Usuario({
        id:     orm.encargado.id,
        nombre: orm.encargado.nombre,
        correo: orm.encargado.correo,
      }) : null,
      creadoEn:      orm.creadoEn,
      actualizadoEn: orm.actualizadoEn,
    });
  }

  private toOrm(ubicacion: Partial<Ubicacion>): Partial<UbicacionOrmEntity> {
    return {
      ...(ubicacion.nombre         !== undefined && { nombre:        ubicacion.nombre }),
      ...(ubicacion.descripcion    !== undefined && { descripcion:   ubicacion.descripcion }),
      ...(ubicacion.estado         !== undefined && { estado:        ubicacion.estado }),
      ...(ubicacion.tipoUbicacion  !== undefined && { tipoUbicacion: { id: ubicacion.tipoUbicacion.id } as any }),
      ...(ubicacion.area           !== undefined && { area:          { id: ubicacion.area.id } as any }),
      ...(ubicacion.encargado      !== undefined && { encargado:     ubicacion.encargado ? { id: ubicacion.encargado.id } as any : null }),
    };
  }

  async create(ubicacion: Ubicacion): Promise<Ubicacion> {
    const ormEntity = this.repo.create(this.toOrm(ubicacion));
    const saved = await this.repo.save(ormEntity);
    const result = await this.findOne(saved.id);
    return result!;
  }

  async findAll(sedeId?: string | null): Promise<Ubicacion[]> {
    const query = this.repo.createQueryBuilder('ubicacion')
      .leftJoinAndSelect('ubicacion.tipoUbicacion', 'tipoUbicacion')
      .leftJoinAndSelect('ubicacion.area', 'area')
      .leftJoinAndSelect('ubicacion.encargado', 'encargado')
      .leftJoin('area.sede', 'sede');

    if (sedeId !== undefined) {
      query.where(sedeId ? 'sede.id = :sedeId' : '1 = 0', sedeId ? { sedeId } : {});
    }

    const list = await query.getMany();
    return list.map(this.toDomain.bind(this));
  }

  async findOne(id: string): Promise<Ubicacion | null> {
    const found = await this.repo.findOne({
      where: { id },
      relations: ['tipoUbicacion', 'area', 'encargado'],
    });
    return found ? this.toDomain(found) : null;
  }

  async findByEncargadoId(userId: string): Promise<Ubicacion[]> {
    const list = await this.repo.find({
      where: { encargado: { id: userId } },
      relations: ['tipoUbicacion', 'area', 'encargado'],
    });
    return list.map(this.toDomain.bind(this));
  }

  async findByMaterialItemId(materialItemId: string): Promise<Ubicacion | null> {
    const ub = await this.repo.manager
      .createQueryBuilder(UbicacionOrmEntity, 'ub')
      .leftJoinAndSelect('ub.encargado', 'encargado')
      .leftJoinAndSelect('ub.tipoUbicacion', 'tipoUbicacion')
      .leftJoinAndSelect('ub.area', 'area')
      .innerJoin('materiales', 'mat', 'mat.ubicacion_id = ub.id')
      .innerJoin('material_item', 'mi', 'mi.materiale_id = mat.id')
      .where('mi.id = :id', { id: materialItemId })
      .getOne();
    return ub ? this.toDomain(ub) : null;
  }

  async update(id: string, ubicacion: Partial<Ubicacion>): Promise<Ubicacion> {
    await this.repo.update(id, this.toOrm(ubicacion));
    const result = await this.findOne(id);
    return result!;
  }

  async remove(id: string): Promise<void> {
    await this.repo.delete(id);
  }
}
