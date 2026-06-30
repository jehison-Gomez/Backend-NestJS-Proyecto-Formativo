import { Injectable } from '@nestjs/common';
import { DataSource, In } from 'typeorm';
import { FindOneMaterialeUseCase } from './find-one-materiale.use-case';
import { MovimientoOrmEntity } from 'src/movimientos/infrastructure/persistence/movimiento.orm-entity';
import { Material_itemOrmEntity } from 'src/material_item/infrastructure/persistence/material_item.orm-entity';
import { Material_consumibleOrmEntity } from 'src/material_consumible/infrastructure/persistence/material_consumible.orm-entity';

@Injectable()
export class FindKardexMaterialeUseCase {
  constructor(
    private readonly findOneMateriale: FindOneMaterialeUseCase,
    private readonly dataSource: DataSource,
  ) {}

  async execute(materialeId: string) {
    await this.findOneMateriale.execute(materialeId);

    const [items, consumibles] = await Promise.all([
      this.dataSource.getRepository(Material_itemOrmEntity).find({
        where: { materiale: { id: materialeId } },
        select: ['id'],
      }),
      this.dataSource.getRepository(Material_consumibleOrmEntity).find({
        where: { materiale: { id: materialeId } },
        select: ['id'],
      }),
    ]);

    const itemIds      = items.map(i => i.id);
    const consumibleIds = consumibles.map(c => c.id);

    if (itemIds.length === 0 && consumibleIds.length === 0) return [];

    const where: any[] = [];
    if (itemIds.length > 0)       where.push({ materialItem:       In(itemIds) });
    if (consumibleIds.length > 0) where.push({ materialConsumible: In(consumibleIds) });

    return this.dataSource.getRepository(MovimientoOrmEntity).find({
      where,
      relations: ['materialItem', 'materialConsumible', 'prestamo', 'usuario'],
      order: { creadoEn: 'ASC' },
    });
  }
}
