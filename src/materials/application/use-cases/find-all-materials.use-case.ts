import { MaterialRepository } from '../../domain/material.repository';
import { Material } from '../../domain/material.entity';

export class FindAllMaterialsUseCase {
  constructor(private readonly repository: MaterialRepository) {}

  async execute(): Promise<Material[]> {
    return this.repository.findAll();
  }
}
