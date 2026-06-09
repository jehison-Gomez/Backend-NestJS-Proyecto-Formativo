import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { FindOneFichaUseCase } from './find-one-ficha.use-case';

export interface MaterialDisponible {
  id: string;
  nombre: string;
  descripcion: string;
  tipoMaterial: string;
  disponibles: number;
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
      `SELECT m.id, m.nombre, m.descripcion, m."tipoMaterial"
       FROM materiales m
       WHERE m.ficha_id = $1 AND m.estado = 'activo'`,
      [fichaId],
    );

    const result: MaterialDisponible[] = [];

    for (const mat of materiales) {
      if (mat.tipoMaterial === 'item') {
        const [{ count }] = await this.dataSource.query(
          `SELECT COUNT(*) as count FROM material_item
           WHERE materiale_id = $1 AND estado = 'activo'`,
          [mat.id],
        );
        result.push({
          id:           mat.id,
          nombre:       mat.nombre,
          descripcion:  mat.descripcion,
          tipoMaterial: mat.tipoMaterial,
          disponibles:  Number(count),
        });
      } else {
        const rows = await this.dataSource.query(
          `SELECT "stockActual", "stockMinimo", "unidadMedida"
           FROM material_consumible
           WHERE materiale_id = $1 AND estado = 'activo'
           LIMIT 1`,
          [mat.id],
        );
        const consumible = rows[0];
        result.push({
          id:           mat.id,
          nombre:       mat.nombre,
          descripcion:  mat.descripcion,
          tipoMaterial: mat.tipoMaterial,
          disponibles:  consumible ? Number(consumible.stockActual) : 0,
          stockMinimo:  consumible ? Number(consumible.stockMinimo) : 0,
          unidadMedida: consumible?.unidadMedida,
        });
      }
    }

    return result;
  }
}
