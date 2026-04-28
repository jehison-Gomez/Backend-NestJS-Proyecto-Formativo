import { MaterialRepository } from '../../domain/material.repository';
import { Material } from '../../domain/material.entity';

export class FindOneMaterialUseCase {
  constructor(private readonly repository: MaterialRepository) {}

  async execute(id: number): Promise<Material | null> {
    return this.repository.findById(id);
  }
}
