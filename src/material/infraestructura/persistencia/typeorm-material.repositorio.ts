import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MaterialRepositorio } from '../../dominio/material.repositorio';
import { Material } from '../../dominio/material.entidad';
import { MaterialOrmEntidad } from './material.orm-entidad';

@Injectable()
export class TypeOrmMaterialRepositorio implements MaterialRepositorio {

  constructor(
    @InjectRepository(MaterialOrmEntidad)
    private readonly repo: Repository<MaterialOrmEntidad>,
  ) {}

  async guardar(m: Material): Promise<Material> {
    let orm: MaterialOrmEntidad | null;
    if (m.id) {
      orm = await this.repo.findOneBy({ id: m.id });
      if (!orm) orm = new MaterialOrmEntidad();
    } else {
      orm = new MaterialOrmEntidad();
    }
    orm.nombre = m.nombre;
    orm.tipo = m.tipo;
    orm.unidadMedida = m.unidadMedida;
    orm.codigoUncs = m.codigoUncs;
    orm.codigoSku = m.codigoSku;
    orm.codigoBarras = m.codigoBarras;
    orm.categoria = m.categoria;
    orm.lote = m.lote;
    orm.estadoFisico = m.estadoFisico;
    orm.sitioId = m.sitioId;
    orm.fechaVencimiento = m.fechaVencimiento;
    const guardado = await this.repo.save(orm);
    return this.aDominio(guardado);
  }

  async buscarTodos(): Promise<Material[]> {
    const lista = await this.repo.find();
    return lista.map(o => this.aDominio(o));
  }

  async buscarPorId(id: number): Promise<Material | null> {
    const encontrado = await this.repo.findOneBy({ id });
    return encontrado ? this.aDominio(encontrado) : null;
  }

  async eliminar(id: number): Promise<void> {
    await this.repo.delete(id);
  }

  private aDominio(o: MaterialOrmEntidad): Material {
    const m = new Material();
    m.id = o.id; m.nombre = o.nombre; m.tipo = o.tipo;
    m.unidadMedida = o.unidadMedida; m.codigoUncs = o.codigoUncs;
    m.codigoSku = o.codigoSku; m.codigoBarras = o.codigoBarras;
    m.categoria = o.categoria; m.lote = o.lote;
    m.estadoFisico = o.estadoFisico; m.sitioId = o.sitioId;
    m.fechaVencimiento = o.fechaVencimiento;
    return m;
  }
}