import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MaterialeRepository } from '../../domain/materiale.repository';
import { Materiale } from '../../domain/materiale.entity';
import { MaterialeOrmEntity } from './materiale.orm-entity';
import { Categoria_material } from 'src/categoria_material/domain/categoria_material.entity';
import { Ficha } from 'src/fichas/domain/ficha.entity';

@Injectable()
export class TypeOrmMaterialeRepository implements MaterialeRepository {
  constructor(
    @InjectRepository(MaterialeOrmEntity)
    private readonly repo: Repository<MaterialeOrmEntity>,
  ) {}

  private toDomain(orm: MaterialeOrmEntity): Materiale {
    return new Materiale({
      id:          orm.id,
      nombre:      orm.nombre,
      descripcion: orm.descripcion,
      estado:      orm.estado,
      tipoMaterial: orm.tipoMaterial,
      categoriaMaterial: orm.categoriaMaterial ? new Categoria_material({
        id:          orm.categoriaMaterial.id,
        nombre:      orm.categoriaMaterial.nombre,
        descripcion: orm.categoriaMaterial.descripcion,
        estado:      orm.categoriaMaterial.estado,
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

  private toOrm(materiale: Partial<Materiale>): Partial<MaterialeOrmEntity> {
    return {
      ...(materiale.nombre            !== undefined && { nombre:            materiale.nombre }),
      ...(materiale.descripcion       !== undefined && { descripcion:       materiale.descripcion }),
      ...(materiale.estado            !== undefined && { estado:            materiale.estado }),
      ...(materiale.tipoMaterial      !== undefined && { tipoMaterial:      materiale.tipoMaterial }),
      ...(materiale.categoriaMaterial !== undefined && { categoriaMaterial: { id: materiale.categoriaMaterial.id } as any }),
      ...(materiale.ficha             !== undefined && { ficha:             { id: materiale.ficha.id } as any }),
    };
  }

  async create(materiale: Materiale): Promise<Materiale> {
    const ormEntity = this.repo.create(this.toOrm(materiale));
    const saved = await this.repo.save(ormEntity);
    return (await this.findOne(saved.id))!;
  }

  async findAll(): Promise<Materiale[]> {
    const list = await this.repo.find({ relations: ['categoriaMaterial', 'ficha'] });
    return list.map(this.toDomain.bind(this));
  }

  async findOne(id: string): Promise<Materiale | null> {
    const found = await this.repo.findOne({
      where: { id },
      relations: ['categoriaMaterial', 'ficha'],
    });
    return found ? this.toDomain(found) : null;
  }

  async update(id: string, materiale: Partial<Materiale>): Promise<Materiale> {
    await this.repo.update(id, this.toOrm(materiale));
    return (await this.findOne(id))!;
  }

  async remove(id: string): Promise<void> {
    await this.repo.delete(id);
  }
}
