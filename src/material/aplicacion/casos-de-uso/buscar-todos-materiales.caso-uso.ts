import { Inject, Injectable } from '@nestjs/common';
import { MaterialRepositorio, MATERIAL_REPOSITORIO } from '../../dominio/material.repositorio';
import { Material } from '../../dominio/material.entidad';

@Injectable()
export class BuscarTodosMaterialesCasoUso {
  constructor(
    @Inject(MATERIAL_REPOSITORIO)
    private readonly repositorio: MaterialRepositorio,
  ) {}

  async ejecutar(): Promise<Material[]> {
    return this.repositorio.buscarTodos();
  }
}