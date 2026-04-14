import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { TrasladoRepositorio, TRASLADO_REPOSITORIO } from '../../dominio/traslado.repositorio';
import { Traslado } from '../../dominio/traslado.entidad';
@Injectable()
export class BuscarUnTrasladoCasoUso {
  constructor(@Inject(TRASLADO_REPOSITORIO) private readonly repo: TrasladoRepositorio) {}
  async ejecutar(id: number): Promise<Traslado> {
    const t = await this.repo.buscarPorId(id);
    if (!t) throw new NotFoundException(`Traslado con id ${id} no encontrado`);
    return t;
  }
}