import { Inject, Injectable } from '@nestjs/common';
import { TrasladoRepositorio, TRASLADO_REPOSITORIO } from '../../dominio/traslado.repositorio';
import { BuscarUnTrasladoCasoUso } from './buscar-un-traslado.caso-uso';
@Injectable()
export class EliminarTrasladoCasoUso {
  constructor(
    @Inject(TRASLADO_REPOSITORIO) private readonly repo: TrasladoRepositorio,
    private readonly buscarUno: BuscarUnTrasladoCasoUso,
  ) {}
  async ejecutar(id: number): Promise<void> {
    await this.buscarUno.ejecutar(id);
    await this.repo.eliminar(id);
  }
}