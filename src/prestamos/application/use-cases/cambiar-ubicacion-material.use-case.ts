import { Injectable, BadRequestException } from '@nestjs/common';
import { CambiarUbicacionMaterialDto }     from '../dto/cambiar-ubicacion-material.dto';
import { FindOnePrestamoUseCase }          from './find-one-prestamo.use-case';
import { FindOneMaterialeUseCase }         from 'src/materiales/application/use-cases/find-one-materiale.use-case';
import { UpdateMaterialeUseCase }          from 'src/materiales/application/use-cases/update-materiale.use-case';
import { CreateMaterial_ubicacionUseCase } from 'src/material_ubicacion/application/use-cases/create-material_ubicacion.use-case';
import { PrestamoEstado }                  from '../../domain/prestamo-estado.enum';

@Injectable()
export class CambiarUbicacionMaterialUseCase {
  constructor(
    private readonly findOnePrestamo:          FindOnePrestamoUseCase,
    private readonly findOneMateriale:         FindOneMaterialeUseCase,
    private readonly updateMateriale:          UpdateMaterialeUseCase,
    private readonly createMaterialUbicacion:  CreateMaterial_ubicacionUseCase,
  ) {}

  async execute(prestamoId: string, dto: CambiarUbicacionMaterialDto) {
    const prestamo = await this.findOnePrestamo.execute(prestamoId);

    if (prestamo.estado === PrestamoEstado.DEVUELTO || prestamo.estado === PrestamoEstado.RECHAZADO) {
      throw new BadRequestException(
        `No se puede cambiar ubicación en un préstamo con estado "${prestamo.estado}"`,
      );
    }

    const material          = await this.findOneMateriale.execute(dto.materialId);
    const ubicacionAnterior = material.ubicacion;

    // Actualizar ubicación en el material (UpdateMaterialeUseCase valida que la ubicación exista)
    await this.updateMateriale.execute(dto.materialId, {
      ubicacionId: dto.nuevaUbicacionId,
    });

    // Registrar en historial material_ubicacion
    await this.createMaterialUbicacion.execute({
      materialId:  dto.materialId,
      ubicacionId: dto.nuevaUbicacionId,
    });

    return {
      message:           'Ubicación actualizada correctamente',
      materialId:        dto.materialId,
      materialNombre:    material.nombre,
      ubicacionAnterior: ubicacionAnterior?.nombre ?? 'Sin ubicación previa',
      nuevaUbicacionId:  dto.nuevaUbicacionId,
      prestamoId,
    };
  }
}
