import { Injectable, NotFoundException } from '@nestjs/common';
import { Material_consumibleRepository } from '../../domain/material_consumible.repository';
import { UpdateMaterial_consumibleDto } from '../dto/update-material_consumible.dto';
import { Material_consumible } from '../../domain/material_consumible.entity';
import { handleDbErrors } from '../handle-db-errors';

@Injectable()
export class UpdateMaterial_consumibleUseCase {
  constructor(private readonly material_consumibleRepository: Material_consumibleRepository) {}

  async execute(id: string, dto: UpdateMaterial_consumibleDto): Promise<Material_consumible> {
    const exists = await this.material_consumibleRepository.findOne(id);
    if (!exists) throw new NotFoundException(`Material_consumible #${id} no encontrado`);

    const partial: Partial<Material_consumible> = {};
    if (dto.stockActual      !== undefined) partial.stockActual      = dto.stockActual;
    if (dto.stockMinimo      !== undefined) partial.stockMinimo      = dto.stockMinimo;
    if (dto.unidadMedida     !== undefined) partial.unidadMedida     = dto.unidadMedida;
    if (dto.fechaVencimiento !== undefined) partial.fechaVencimiento = new Date(dto.fechaVencimiento);
    if (dto.estado           !== undefined) partial.estado           = dto.estado;

    try {
      return await this.material_consumibleRepository.update(id, partial);
    } catch (error) {
      handleDbErrors(error);
    }
  }
}
