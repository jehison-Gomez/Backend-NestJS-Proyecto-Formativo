import { Inject, Injectable } from '@nestjs/common';
import { MaterialRepositorio, MATERIAL_REPOSITORIO } from '../../dominio/material.repositorio';
import { BuscarUnMaterialCasoUso } from './buscar-un-material.caso-uso';

@Injectable()
export class EliminarMaterialCasoUso {
  constructor(
    @Inject(MATERIAL_REPOSITORIO)
    private readonly repositorio: MaterialRepositorio,
    private readonly buscarUno: BuscarUnMaterialCasoUso,
  ) {}

  async ejecutar(id: number): Promise<void> {
    await this.buscarUno.ejecutar(id); // verifica que existe
    await this.repositorio.eliminar(id);
  }
}