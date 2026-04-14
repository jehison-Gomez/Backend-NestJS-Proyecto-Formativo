import { Inject, Injectable } from '@nestjs/common';
import { TrasladoRepositorio, TRASLADO_REPOSITORIO } from '../../dominio/traslado.repositorio';
@Injectable()
export class BuscarTodosTrasladosCasoUso {
  constructor(@Inject(TRASLADO_REPOSITORIO) private readonly repo: TrasladoRepositorio) {}
  async ejecutar() { return this.repo.buscarTodos(); }
}