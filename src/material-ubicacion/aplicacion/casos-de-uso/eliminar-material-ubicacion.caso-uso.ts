import { Inject, Injectable } from '@nestjs/common';
import { MaterialUbicacionRepositorio, MATERIAL_UBICACION_REPOSITORIO } from '../../dominio/material-ubicacion.repositorio';
import { BuscarUnMaterialUbicacionCasoUso } from './buscar-un-material-ubicacion.caso-uso';
@Injectable()
export class EliminarMaterialUbicacionCasoUso {
  constructor(
    @Inject(MATERIAL_UBICACION_REPOSITORIO) private readonly repo: MaterialUbicacionRepositorio,
    private readonly buscarUno: BuscarUnMaterialUbicacionCasoUso,
  ) {}
  async ejecutar(id: number): Promise<void> {
    await this.buscarUno.ejecutar(id);
    await this.repo.eliminar(id);
  }
}