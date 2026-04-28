import { Inject, Injectable } from '@nestjs/common';
import { PrestamoRepositorio, PRESTAMO_REPOSITORIO } from '../../dominio/prestamo.repositorio.js';
@Injectable()
export class BuscarTodosPrestamosCasoUso {
  constructor(@Inject(PRESTAMO_REPOSITORIO) private readonly repo: PrestamoRepositorio) {}
  async ejecutar() { return this.repo.buscarTodos(); }
}