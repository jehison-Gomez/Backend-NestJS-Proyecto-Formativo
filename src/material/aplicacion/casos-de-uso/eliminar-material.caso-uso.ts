import { Inject, Injectable } from '@nestjs/common';
import { MATERIAL_REPOSITORIO } from '../../dominio/material.repositorio';
import type { MaterialRepositorio } from '../../dominio/material.repositorio';
import { BuscarUnMaterialCasoUso } from './buscar-un-material.caso-uso';

@Injectable()
export class EliminarMaterialCasoUso {
  constructor(
    @Inject(MATERIAL_REPOSITORIO)
    private readonly repositorio: MaterialRepositorio,
    private readonly buscarUno: BuscarUnMaterialCasoUso,
  ) {}

  async ejecutar(id: number): Promise<void> {
    await this.buscarUno.ejecutar(id);
    await this.repositorio.eliminar(id);
  }
}