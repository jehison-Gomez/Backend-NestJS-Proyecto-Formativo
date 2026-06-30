import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { FindOneMaterial_itemUseCase } from './find-one-material_item.use-case';
import { MovimientoOrmEntity } from 'src/movimientos/infrastructure/persistence/movimiento.orm-entity';

@Injectable()
export class FindKardexMaterial_itemUseCase {
  constructor(
    private readonly findOneMaterialItem: FindOneMaterial_itemUseCase,
    private readonly dataSource: DataSource,
  ) {}

  async execute(materialItemId: string) {
    await this.findOneMaterialItem.execute(materialItemId);

    return this.dataSource
      .getRepository(MovimientoOrmEntity)
      .find({
        where: { materialItem: { id: materialItemId } },
        relations: ['prestamo', 'materialItem', 'materialConsumible', 'usuario'],
        order: { creadoEn: 'ASC' },
      });
  }
}
