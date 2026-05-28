import { Injectable } from '@nestjs/common';
import { Material_consumibleRepository } from '../../domain/material_consumible.repository';
import { CreateMaterial_consumibleDto } from '../dto/create-material_consumible.dto';
import { Material_consumible } from '../../domain/material_consumible.entity';
import { handleDbErrors } from '../handle-db-errors';

@Injectable()
export class CreateMaterial_consumibleUseCase {
  constructor(private readonly material_consumibleRepository: Material_consumibleRepository) {}

  async execute(dto: CreateMaterial_consumibleDto): Promise<Material_consumible> {
    try {
      const material_consumible = new Material_consumible({
        stockActual:      dto.stockActual,
        stockMinimo:      dto.stockMinimo,
        unidadMedida:     dto.unidadMedida,
        fechaVencimiento: dto.fechaVencimiento ? new Date(dto.fechaVencimiento) : undefined,
        estado:           dto.estado,
      });
      return await this.material_consumibleRepository.create(material_consumible);
    } catch (error) {
      handleDbErrors(error);
    }
  }
}
