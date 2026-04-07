import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { MaterialRepositorio, MATERIAL_REPOSITORIO } from '../../dominio/material.repositorio';
import { Material } from '../../dominio/material.entidad';

@Injectable()
export class BuscarUnMaterialCasoUso {
  constructor(
    @Inject(MATERIAL_REPOSITORIO)
    private readonly repositorio: MaterialRepositorio,
  ) {}

  async ejecutar(id: number): Promise<Material> {
    const material = await this.repositorio.buscarPorId(id);
    if (!material)
      throw new NotFoundException(`Material con id ${id} no encontrado`);
    return material;
  }
}