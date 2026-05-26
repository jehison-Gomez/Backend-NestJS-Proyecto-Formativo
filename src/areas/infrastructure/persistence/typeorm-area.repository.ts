import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AreaRepository } from '../../domain/area.repository';
import { Area } from '../../domain/area.entity';
import { AreaOrmEntity } from './area.orm-entity';
import { Sede } from 'src/sedes/domain/sede.entity';
import { Usuario } from 'src/usuarios/domain/usuario.entity';

@Injectable()
export class TypeOrmAreaRepository implements AreaRepository {
  constructor(
    @InjectRepository(AreaOrmEntity)
    private readonly repo: Repository<AreaOrmEntity>,
  ) {}

  private toDomain(orm: AreaOrmEntity): Area {
    return new Area({
      id: orm.id,
      nombre: orm.nombre,
      descripcion: orm.descripcion,
      estado: orm.estado,
      sede: orm.sede ? new Sede({
        id: orm.sede.id,
        nombre: orm.sede.nombre,
        direccion: orm.sede.direccion,
        estado: orm.sede.estado,
      }) : undefined,
      usuarioLider: orm.usuarioLider ? new Usuario({
        id: orm.usuarioLider.id,
        nombre: orm.usuarioLider.nombre,
        correo: orm.usuarioLider.correo,
        estado: orm.usuarioLider.estado,
      }) : undefined,
      creadoEn: orm.creadoEn,
      actualizadoEn: orm.actualizadoEn,
    });
  }

  private toOrm(area: Partial<Area>): Partial<AreaOrmEntity> {
    return {
      ...(area.nombre !== undefined && { nombre: area.nombre }),
      ...(area.descripcion !== undefined && { descripcion: area.descripcion }),
      ...(area.estado !== undefined && { estado: area.estado }),
      ...(area.sede !== undefined && { sede: { id: area.sede.id } as any }),
      ...(area.usuarioLider !== undefined && { usuarioLider: { id: area.usuarioLider.id } as any }),
    };
  }

  async create(area: Area): Promise<Area> {
    const ormEntity = this.repo.create(this.toOrm(area));
    const saved = await this.repo.save(ormEntity);
    const result = await this.findOne(saved.id);
    return result!;
  }

  async findAll(): Promise<Area[]> {
    const list = await this.repo.find({
      relations: ['sede', 'usuarioLider'],
    });
    return list.map(this.toDomain.bind(this));
  }

  async findOne(id: string): Promise<Area | null> {
    const found = await this.repo.findOne({
      where: { id },
      relations: ['sede', 'usuarioLider'],
    });
    return found ? this.toDomain(found) : null;
  }

  async update(id: string, area: Partial<Area>): Promise<Area> {
    await this.repo.update(id, this.toOrm(area));
    const result = await this.findOne(id);
    return result!;
  }

  async remove(id: string): Promise<void> {
    await this.repo.delete(id);
  }
}
