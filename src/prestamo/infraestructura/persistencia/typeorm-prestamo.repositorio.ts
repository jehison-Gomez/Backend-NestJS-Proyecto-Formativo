import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PrestamoRepositorio } from '../../dominio/prestamo.repositorio.js';
import { Prestamo } from '../../dominio/prestamo.entidad.js';
import { PrestamoOrmEntidad } from './prestamo.orm-entidad.js';

@Injectable()
export class TypeOrmPrestamoRepositorio implements PrestamoRepositorio {
  constructor(@InjectRepository(PrestamoOrmEntidad) private readonly repo: Repository<PrestamoOrmEntidad>) {}

  async guardar(p: Prestamo): Promise<Prestamo> {
    let orm = p.idPrestamo ? await this.repo.findOneBy({ idPrestamo: p.idPrestamo }) : null;
    if (!orm) orm = new PrestamoOrmEntidad();
    Object.assign(orm, p);
    return this.aDominio(await this.repo.save(orm));
  }
  async buscarTodos() { return (await this.repo.find()).map(o => this.aDominio(o)); }
  async buscarPorId(id: number) {
    const o = await this.repo.findOneBy({ idPrestamo: id });
    return o ? this.aDominio(o) : null;
  }
  async eliminar(id: number) { await this.repo.delete(id); }

  private aDominio(o: PrestamoOrmEntidad): Prestamo {
    const p = new Prestamo();
    p.idPrestamo = o.idPrestamo; p.codigoPrestamo = o.codigoPrestamo;
    p.fechaSolicitud = o.fechaSolicitud; p.fechaAprobacion = o.fechaAprobacion;
    p.fechaVencimiento = o.fechaVencimiento; p.estado = o.estado;
    p.observacion = o.observacion; p.idUsuario = o.idUsuario;
    return p;
  }
}