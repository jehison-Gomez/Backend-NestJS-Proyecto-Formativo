import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { MaterialUbicacionRepositorio, MATERIAL_UBICACION_REPOSITORIO } from '../../dominio/material-ubicacion.repositorio';
@Injectable()
export class BuscarUnMaterialUbicacionCasoUso {
  constructor(@Inject(MATERIAL_UBICACION_REPOSITORIO) private readonly repo: MaterialUbicacionRepositorio) {}
  async ejecutar(id: number) {
    const mu = await this.repo.buscarPorId(id);
    if (!mu) throw new NotFoundException(`MaterialUbicacion con id ${id} no encontrado`);
    return mu;
  }
}