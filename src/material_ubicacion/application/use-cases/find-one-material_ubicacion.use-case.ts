import { Injectable, NotFoundException } from '@nestjs/common';
import { Material_ubicacionRepository } from '../../domain/material_ubicacion.repository';
import { Material_ubicacion } from '../../domain/material_ubicacion.entity';

@Injectable()
export class FindOneMaterial_ubicacionUseCase {
  constructor(private readonly material_ubicacionRepository: Material_ubicacionRepository) {}

  async execute(id: string): Promise<Material_ubicacion> {
    const material_ubicacion = await this.material_ubicacionRepository.findOne(id);
    if (!material_ubicacion) throw new NotFoundException(`Material_ubicacion #${id} no encontrado`);
    return material_ubicacion;
  }
}
