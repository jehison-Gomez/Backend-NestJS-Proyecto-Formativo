import { Inject, Injectable } from '@nestjs/common';
import { MATERIAL_REPOSITORIO } from '../../dominio/material.repositorio';
import type { MaterialRepositorio } from '../../dominio/material.repositorio';
import { Material, TipoMaterial } from '../../dominio/material.entidad';
import { CrearMaterialDto } from '../dto/crear-material.dto';
import { manejarErroresDB } from '../manejar-errores-db';

@Injectable()
export class CrearMaterialCasoUso {
  constructor(
    @Inject(MATERIAL_REPOSITORIO)
    private readonly repositorio: MaterialRepositorio,
  ) {}

  async ejecutar(dto: CrearMaterialDto): Promise<Material> {
    const material = new Material();
    material.nombre = dto.nombre;
    material.tipo = dto.tipo as TipoMaterial;
    material.unidadMedida = dto.unidadMedida;
    material.codigoUncs = dto.codigoUncs;
    material.codigoSku = dto.codigoSku;
    material.codigoBarras = dto.codigoBarras;
    material.categoria = dto.categoria;
    material.lote = dto.lote;
    material.estadoFisico = dto.estadoFisico;
    material.sitioId = dto.sitioId;

    if (dto.fechaVencimiento) {
      material.fechaVencimiento = new Date(dto.fechaVencimiento);
    }

    try {
      return await this.repositorio.guardar(material);
    } catch (error) {
      manejarErroresDB(error);
      throw error;
    }
  }
}