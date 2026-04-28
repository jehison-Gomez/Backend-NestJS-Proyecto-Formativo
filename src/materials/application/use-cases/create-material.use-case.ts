import { MaterialRepository } from '../../domain/material.repository';
import { CreateMaterialDto } from '../dto/create-material.dto';
import { Material } from '../../domain/material.entity';

export class CreateMaterialUseCase {
  constructor(private readonly repository: MaterialRepository) {}

  async execute(dto: CreateMaterialDto): Promise<Material> {
    const material = new Material();
    Object.assign(material, dto);
    return this.repository.save(material);
  }
}
