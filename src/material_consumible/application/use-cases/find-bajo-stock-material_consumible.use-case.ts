import { Injectable } from '@nestjs/common';
import { Material_consumibleRepository } from '../../domain/material_consumible.repository';
import { Material_consumible } from '../../domain/material_consumible.entity';

@Injectable()
export class FindBajoStockMaterial_consumibleUseCase {
  constructor(private readonly repo: Material_consumibleRepository) {}

  execute(sedeId?: string | null): Promise<Material_consumible[]> {
    return this.repo.findBajoStock(sedeId);
  }
}
