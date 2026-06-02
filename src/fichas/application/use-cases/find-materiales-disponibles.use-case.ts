import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { FindOneFichaUseCase } from './find-one-ficha.use-case';

export interface MaterialDisponible {
  id: string;
  nombre: string;
  descripcion: string;
  tieneItems: boolean;
  itemsDisponibles: number;
  tieneConsumible: boolean;
  stockActual?: number;
  stockMinimo?: number;
  unidadMedida?: string;
}

@Injectable()
export class FindMaterialesDisponiblesUseCase {
  constructor(
    @InjectDataSource() private readonly dataSource: DataSource,
    private readonly findOneFicha: FindOneFichaUseCase,
  ) {}

  async execute(fichaId: string): Promise<MaterialDisponible[]> {
    const ficha = await this.findOneFicha.execute(fichaId);
    if (!ficha) throw new NotFoundException(`Ficha #${fichaId} no encontrada`);

    const materiales = await this.dataSource.query(
      `SELECT m.id, m.nombre, m.descripcion
       FROM materiales m
       WHERE m.ficha_id = $1 AND m.estado = 'activo'`,
      [fichaId],
    );

    const result: MaterialDisponible[] = [];

    for (const mat of materiales) {
      const [{ count: itemCount }] = await this.dataSource.query(
        `SELECT COUNT(*) as count FROM material_item
         WHERE materiale_id = $1 AND estado = 'activo'`,
        [mat.id],
      );

      const consumibleRows = await this.dataSource.query(
        `SELECT "stockActual", "stockMinimo", "unidadMedida"
         FROM material_consumible
         WHERE materiale_id = $1 AND estado = 'activo'
         LIMIT 1`,
        [mat.id],
      );
      const consumible = consumibleRows[0];

      result.push({
        id:               mat.id,
        nombre:           mat.nombre,
        descripcion:      mat.descripcion,
        tieneItems:       Number(itemCount) > 0,
        itemsDisponibles: Number(itemCount),
        tieneConsumible:  !!consumible,
        stockActual:      consumible ? Number(consumible.stockActual) : undefined,
        stockMinimo:      consumible ? Number(consumible.stockMinimo) : undefined,
        unidadMedida:     consumible?.unidadMedida,
      });
    }

    return result;
  }
}
