import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TrasladoRepositorio } from '../../dominio/traslado.repositorio';
import { Traslado } from '../../dominio/traslado.entidad';
import { TrasladoOrmEntidad } from './traslado.orm-entidad';

@Injectable()
export class TypeOrmTrasladoRepositorio implements TrasladoRepositorio {
  constructor(
    @InjectRepository(TrasladoOrmEntidad)
    private readonly repo: Repository<TrasladoOrmEntidad>,
  ) {}

  async guardar(t: Traslado): Promise<Traslado> {
    let orm = t.trasladoId ? await this.repo.findOneBy({ trasladoId: t.trasladoId }) : null;
    if (!orm) orm = new TrasladoOrmEntidad();
    Object.assign(orm, t);
    return this.aDominio(await this.repo.save(orm));
  }
  async buscarTodos(): Promise<Traslado[]> {
    return (await this.repo.find()).map(o => this.aDominio(o));
  }
  async buscarPorId(id: number): Promise<Traslado | null> {
    const o = await this.repo.findOneBy({ trasladoId: id });
    return o ? this.aDominio(o) : null;
  }
  async eliminar(id: number): Promise<void> { await this.repo.delete(id); }

  private aDominio(o: TrasladoOrmEntidad): Traslado {
    const t = new Traslado();
    t.trasladoId = o.trasladoId; t.fechaTraslado = o.fechaTraslado;
    t.motivo = o.motivo; t.estado = o.estado;
    t.usuarioId = o.usuarioId;
    t.ubicacionDestinoId = o.ubicacionDestinoId;
    t.ubicacionOrigenId = o.ubicacionOrigenId;
    return t;
  }
}