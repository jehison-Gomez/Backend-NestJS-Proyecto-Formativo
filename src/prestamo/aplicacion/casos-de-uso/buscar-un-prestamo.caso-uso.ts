import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { PrestamoRepositorio, PRESTAMO_REPOSITORIO } from '../../dominio/prestamo.repositorio.js';
import { Prestamo } from '../../dominio/prestamo.entidad.js';
@Injectable()
export class BuscarUnPrestamoCasoUso {
  constructor(@Inject(PRESTAMO_REPOSITORIO) private readonly repo: PrestamoRepositorio) {}
  async ejecutar(id: number): Promise<Prestamo> {
    const p = await this.repo.buscarPorId(id);
    if (!p) throw new NotFoundException(`Préstamo con id ${id} no encontrado`);
    return p;
  }
}