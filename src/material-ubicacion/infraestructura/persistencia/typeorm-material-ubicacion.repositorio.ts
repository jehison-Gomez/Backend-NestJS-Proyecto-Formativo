import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MaterialUbicacionRepositorio } from '../../dominio/material-ubicacion.repositorio';
import { MaterialUbicacion } from '../../dominio/material-ubicacion.entidad';
import { MaterialUbicacionOrmEntidad } from './material-ubicacion.orm-entidad';
@Injectable()
export class TypeOrmMaterialUbicacionRepositorio implements MaterialUbicacionRepositorio {
  constructor(@InjectRepository(MaterialUbicacionOrmEntidad) private readonly repo: Repository<MaterialUbicacionOrmEntidad>) {}
  async guardar(mu: MaterialUbicacion): Promise<MaterialUbicacion> {
    let orm = mu.id ? await this.repo.findOneBy({ id: mu.id }) : null;
    if (!orm) orm = new MaterialUbicacionOrmEntidad();
    Object.assign(orm, mu);
    return this.aDominio(await this.repo.save(orm));
  }
  async buscarTodos() { return (await this.repo.find()).map(o => this.aDominio(o)); }
  async buscarPorId(id: number) { const o = await this.repo.findOneBy({ id }); return o ? this.aDominio(o) : null; }
  async buscarPorMaterial(materialId: number) { return (await this.repo.findBy({ materialId })).map(o => this.aDominio(o)); }
  async eliminar(id: number): Promise<void> { await this.repo.delete(id); }
  private aDominio(o: MaterialUbicacionOrmEntidad): MaterialUbicacion {
    const mu = new MaterialUbicacion(); mu.id = o.id; mu.materialId = o.materialId; mu.ubicacionId = o.ubicacionId; return mu;
  }
}