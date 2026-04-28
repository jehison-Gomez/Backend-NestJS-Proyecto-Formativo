import { MaterialRepository } from '../../domain/material.repository';
import { UpdateMaterialDto } from '../dto/update-material.dto';
import { Material } from '../../domain/material.entity';

export class UpdateMaterialUseCase {
  constructor(private readonly repository: MaterialRepository) {}

  async execute(id: number, dto: UpdateMaterialDto): Promise<Material | null> {
    const material = await this.repository.findById(id);
    if (!material) return null;
    Object.assign(material, dto);
    return this.repository.save(material);
  }
}
