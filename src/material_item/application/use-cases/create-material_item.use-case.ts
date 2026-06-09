import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { Material_itemRepository } from '../../domain/material_item.repository';
import { CreateMaterial_itemDto } from '../dto/create-material_item.dto';
import { Material_item } from '../../domain/material_item.entity';
import { handleDbErrors } from '../handle-db-errors';
import { FindOneMaterialeUseCase } from 'src/materiales/application/use-cases/find-one-materiale.use-case';
import { MovimientoOrmEntity } from 'src/movimientos/infrastructure/persistence/movimiento.orm-entity';
import { MovimientoTipo } from 'src/movimientos/domain/movimiento-tipo.enum';
import { MovimientoEstado } from 'src/movimientos/domain/movimiento-estado.enum';

@Injectable()
export class CreateMaterial_itemUseCase {
  constructor(
    private readonly material_itemRepository: Material_itemRepository,
    private readonly findOneMateriale: FindOneMaterialeUseCase,
    private readonly dataSource: DataSource,
  ) {}

  async execute(dto: CreateMaterial_itemDto): Promise<Material_item> {
    const materiale = await this.findOneMateriale.execute(dto.materialeId);

    let creado: Material_item;
    try {
      const material_item = new Material_item({
        codigoSena:  dto.codigoSena,
        condicion:   dto.condicion,
        observacion: dto.observacion,
        estadoItem:  dto.estadoItem,
        estado:      dto.estado,
        materiale,
      });
      creado = await this.material_itemRepository.create(material_item);
    } catch (error) {
      handleDbErrors(error);
    }

    // Primer movimiento del item: saldo siempre arranca en 1
    await this.dataSource.getRepository(MovimientoOrmEntity).save({
      tipo:         MovimientoTipo.ENTRADA,
      cantidad:     1,
      saldo:        1,
      descripcion:  `Ingreso al inventario: ${materiale.nombre} (${creado!.codigoSena})`,
      estado:       MovimientoEstado.ACTIVO,
      materialItem: { id: creado!.id },
      ...(dto.usuarioId && { usuario: { id: dto.usuarioId } }),
    });

    return creado!;
  }
}
