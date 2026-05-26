import { Injectable } from '@nestjs/common';
import { Material_ubicacionRepository } from '../../domain/material_ubicacion.repository';
import { Material_ubicacion } from '../../domain/material_ubicacion.entity';

@Injectable()
export class FindAllMaterial_ubicacionUseCase {
  constructor(private readonly material_ubicacionRepository: Material_ubicacionRepository) {}

  async execute(): Promise<Material_ubicacion[]> {
    return this.material_ubicacionRepository.findAll();
  }
}
