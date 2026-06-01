import { Injectable } from '@nestjs/common';
import { MovimientoRepository } from 'src/movimientos/domain/movimiento.repository';
import { Movimiento } from 'src/movimientos/domain/movimiento.entity';
import { FindOneMaterial_itemUseCase } from './find-one-material_item.use-case';

@Injectable()
export class FindKardexMaterial_itemUseCase {
  constructor(
    private readonly findOneMaterialItem: FindOneMaterial_itemUseCase,
    private readonly movimientoRepository: MovimientoRepository,
  ) {}

  async execute(materialItemId: string): Promise<Movimiento[]> {
    await this.findOneMaterialItem.execute(materialItemId);
    return this.movimientoRepository.findByMaterialItem(materialItemId);
  }
}
