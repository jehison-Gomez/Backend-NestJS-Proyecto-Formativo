import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MaterialeRepository } from '../../domain/materiale.repository';
import { Materiale } from '../../domain/materiale.entity';
import { MaterialeOrmEntity } from './materiale.orm-entity';
import { Categoria_material } from 'src/categoria_material/domain/categoria_material.entity';
import { Ficha } from 'src/fichas/domain/ficha.entity';
import { Ubicacion } from 'src/ubicacion/domain/ubicacion.entity';
import { TenantContext } from 'src/tenant/tenant.context';

@Injectable()
export class TypeOrmMaterialeRepository implements MaterialeRepository {
  constructor(
    @InjectRepository(MaterialeOrmEntity)
    private readonly repo: Repository<MaterialeOrmEntity>,
    private readonly tenantContext: TenantContext,
  ) {}

  private toDomain(orm: MaterialeOrmEntity): Materiale {
    return new Materiale({
      id:            orm.id,
      nombre:        orm.nombre,
      descripcion:   orm.descripcion,
      sku:           orm.sku,
      codigoUnspsc:  orm.codigoUnspsc,
      tipo:          orm.tipo,
      estado:       orm.estado,
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
      ubicacion: orm.ubicacion ? new Ubicacion({
        id:          orm.ubicacion.id,
        nombre:      orm.ubicacion.nombre,
        descripcion: orm.ubicacion.descripcion,
        estado:      orm.ubicacion.estado,
      }) : undefined,
      creadoEn:      orm.creadoEn,
      actualizadoEn: orm.actualizadoEn,
    });
  }

  private toOrm(materiale: Partial<Materiale>): Partial<MaterialeOrmEntity> {
    return {
      ...(materiale.nombre            !== undefined && { nombre:            materiale.nombre }),
      ...(materiale.descripcion       !== undefined && { descripcion:       materiale.descripcion }),
      ...(materiale.sku               !== undefined && { sku:               materiale.sku }),
      ...(materiale.codigoUnspsc      !== undefined && { codigoUnspsc:      materiale.codigoUnspsc }),
      ...(materiale.tipo              !== undefined && { tipo:              materiale.tipo }),
      ...(materiale.estado            !== undefined && { estado:            materiale.estado }),
      ...(materiale.categoriaMaterial !== undefined && { categoriaMaterial: { id: materiale.categoriaMaterial.id } as any }),
      ...(materiale.ficha             !== undefined && { ficha:             { id: materiale.ficha.id } as any }),
      ...(materiale.ubicacion         !== undefined && { ubicacion:         { id: materiale.ubicacion.id } as any }),
    };
  }

  async create(materiale: Materiale): Promise<Materiale> {
    const ormEntity = this.repo.create(this.toOrm(materiale));
    const saved = await this.repo.save(ormEntity);
    return (await this.findOne(saved.id))!;
  }

  async findAll(sedeId?: string | null): Promise<Materiale[]> {
    const centroId = this.tenantContext.getCentroId();
    const query = this.repo.createQueryBuilder('m')
      .leftJoinAndSelect('m.categoriaMaterial', 'categoriaMaterial')
      .leftJoinAndSelect('m.ficha', 'ficha')
      .leftJoinAndSelect('m.ubicacion', 'ubicacion')
      .leftJoin('ficha.programa', 'programa')
      .leftJoin('programa.area', 'area')
      .leftJoin('area.sede', 'sede')
      .leftJoin('sede.centro', 'centro');

    if (centroId) {
      // Incluir materiales de este centro O materiales sin ficha asignada
      query.andWhere('(centro.id = :centroId OR ficha.id IS NULL)', { centroId });
    }
    if (sedeId !== undefined) {
      if (sedeId) {
        // Incluir materiales de esta sede O materiales sin ficha asignada
        query.andWhere('(sede.id = :sedeId OR ficha.id IS NULL)', { sedeId });
      } else {
        query.andWhere('1 = 0');
      }
    }

    const list = await query.getMany();
    return list.map(this.toDomain.bind(this));
  }

  async findOne(id: string): Promise<Materiale | null> {
    const found = await this.repo.findOne({
      where: { id },
      relations: ['categoriaMaterial', 'ficha', 'ubicacion'],
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
