import { Inject, Injectable } from '@nestjs/common';
import { PrestamoRepositorio, PRESTAMO_REPOSITORIO } from '../../dominio/prestamo.repositorio.js';
import { BuscarUnPrestamoCasoUso } from './buscar-un-prestamo.caso-uso.js';
@Injectable()
export class EliminarPrestamoCasoUso {
  constructor(
    @Inject(PRESTAMO_REPOSITORIO) private readonly repo: PrestamoRepositorio,
    private readonly buscarUno: BuscarUnPrestamoCasoUso,
  ) {}
  async ejecutar(id: number): Promise<void> {
    await this.buscarUno.ejecutar(id);
    await this.repo.eliminar(id);
  }
}