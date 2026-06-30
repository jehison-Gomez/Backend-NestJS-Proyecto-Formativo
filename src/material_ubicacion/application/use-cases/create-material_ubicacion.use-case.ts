import { Injectable } from '@nestjs/common';
import { Material_ubicacionRepository }     from '../../domain/material_ubicacion.repository';
import { CreateMaterial_ubicacionDto }      from '../dto/create-material_ubicacion.dto';
import { Material_ubicacion }              from '../../domain/material_ubicacion.entity';
import { handleDbErrors }                  from '../handle-db-errors';
import { FindOneMaterialeUseCase }         from 'src/materiales/application/use-cases/find-one-materiale.use-case';
import { FindOneUbicacionUseCase }         from 'src/ubicacion/application/use-cases/find-one-ubicacion.use-case';

@Injectable()
export class CreateMaterial_ubicacionUseCase {
  constructor(
    private readonly material_ubicacionRepository: Material_ubicacionRepository,
    private readonly findOneMateriale: FindOneMaterialeUseCase,
    private readonly findOneUbicacion: FindOneUbicacionUseCase,
  ) {}

  async execute(dto: CreateMaterial_ubicacionDto): Promise<Material_ubicacion> {
    const material  = await this.findOneMateriale.execute(dto.materialId);
    const ubicacion = await this.findOneUbicacion.execute(dto.ubicacionId);

    try {
      const mu = new Material_ubicacion({ material, ubicacion });
      return await this.material_ubicacionRepository.create(mu);
    } catch (error) {
      handleDbErrors(error);
    }
  }
}
