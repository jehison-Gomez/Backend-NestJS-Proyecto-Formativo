import { Inject, Injectable } from '@nestjs/common';
import { MaterialRepositorio, MATERIAL_REPOSITORIO } from '../../dominio/material.repositorio';
import { Material } from '../../dominio/material.entidad';
import { ActualizarMaterialDto } from '../dto/actualizar-material.dto';
import { BuscarUnMaterialCasoUso } from './buscar-un-material.caso-uso';
import { manejarErroresDB } from '../manejar-errores-db';

@Injectable()
export class ActualizarMaterialCasoUso {
  constructor(
    @Inject(MATERIAL_REPOSITORIO)
    private readonly repositorio: MaterialRepositorio,
    private readonly buscarUno: BuscarUnMaterialCasoUso,
  ) {}

  async ejecutar(id: number, dto: ActualizarMaterialDto): Promise<Material> {
    const material = await this.buscarUno.ejecutar(id);
    if (dto.nombre !== undefined) material.nombre = dto.nombre;
    if (dto.tipo !== undefined) material.tipo = dto.tipo as any;
    if (dto.unidadMedida !== undefined) material.unidadMedida = dto.unidadMedida;
    if (dto.categoria !== undefined) material.categoria = dto.categoria;
    if (dto.lote !== undefined) material.lote = dto.lote;
    if (dto.estadoFisico !== undefined) material.estadoFisico = dto.estadoFisico;
    try { return await this.repositorio.guardar(material); }
    catch (error) { manejarErroresDB(error); }
  }
}