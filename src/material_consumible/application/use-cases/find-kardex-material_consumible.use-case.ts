import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { FindOneMaterial_consumibleUseCase } from './find-one-material_consumible.use-case';
import { MovimientoOrmEntity } from 'src/movimientos/infrastructure/persistence/movimiento.orm-entity';

@Injectable()
export class FindKardexMaterial_consumibleUseCase {
  constructor(
    private readonly findOneMaterialConsumible: FindOneMaterial_consumibleUseCase,
    private readonly dataSource: DataSource,
  ) {}

  async execute(materialConsumibleId: string) {
    await this.findOneMaterialConsumible.execute(materialConsumibleId);

    return this.dataSource
      .getRepository(MovimientoOrmEntity)
      .find({
        where: { materialConsumible: { id: materialConsumibleId } },
        relations: ['prestamo', 'materialItem', 'materialConsumible', 'usuario'],
        order: { creadoEn: 'ASC' },
      });
  }
}
