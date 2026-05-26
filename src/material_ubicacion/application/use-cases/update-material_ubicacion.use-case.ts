import { Injectable, NotFoundException } from '@nestjs/common';
import { Material_ubicacionRepository }     from '../../domain/material_ubicacion.repository';
import { UpdateMaterial_ubicacionDto }      from '../dto/update-material_ubicacion.dto';
import { Material_ubicacion }              from '../../domain/material_ubicacion.entity';
import { handleDbErrors }                  from '../handle-db-errors';
import { FindOneMaterialeUseCase }         from 'src/materiales/application/use-cases/find-one-materiale.use-case';
import { FindOneUbicacionUseCase }         from 'src/ubicacion/application/use-cases/find-one-ubicacion.use-case';

@Injectable()
export class UpdateMaterial_ubicacionUseCase {
  constructor(
    private readonly material_ubicacionRepository: Material_ubicacionRepository,
    private readonly findOneMateriale: FindOneMaterialeUseCase,
    private readonly findOneUbicacion: FindOneUbicacionUseCase,
  ) {}

  async execute(id: string, dto: UpdateMaterial_ubicacionDto): Promise<Material_ubicacion> {
    const exists = await this.material_ubicacionRepository.findOne(id);
    if (!exists) throw new NotFoundException(`Material_ubicacion #${id} no encontrado`);

    const partial: Partial<Material_ubicacion> = {};
    if (dto.materialId  !== undefined) partial.material  = await this.findOneMateriale.execute(dto.materialId);
    if (dto.ubicacionId !== undefined) partial.ubicacion = await this.findOneUbicacion.execute(dto.ubicacionId);

    try {
      return await this.material_ubicacionRepository.update(id, partial);
    } catch (error) {
      handleDbErrors(error);
    }
  }
}
