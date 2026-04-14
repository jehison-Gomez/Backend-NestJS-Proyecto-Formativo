import { Inject, Injectable } from '@nestjs/common';
import { MaterialUbicacionRepositorio, MATERIAL_UBICACION_REPOSITORIO } from '../../dominio/material-ubicacion.repositorio';
@Injectable()
export class BuscarTodosMaterialUbicacionCasoUso {
  constructor(@Inject(MATERIAL_UBICACION_REPOSITORIO) private readonly repo: MaterialUbicacionRepositorio) {}
  async ejecutar() { return this.repo.buscarTodos(); }
}