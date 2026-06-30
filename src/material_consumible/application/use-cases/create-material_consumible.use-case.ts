import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { Material_consumibleRepository } from '../../domain/material_consumible.repository';
import { CreateMaterial_consumibleDto } from '../dto/create-material_consumible.dto';
import { Material_consumible } from '../../domain/material_consumible.entity';
import { handleDbErrors } from '../handle-db-errors';
import { FindOneMaterialeUseCase } from 'src/materiales/application/use-cases/find-one-materiale.use-case';
import { MovimientoOrmEntity } from 'src/movimientos/infrastructure/persistence/movimiento.orm-entity';
import { MovimientoTipo } from 'src/movimientos/domain/movimiento-tipo.enum';
import { MovimientoEstado } from 'src/movimientos/domain/movimiento-estado.enum';

@Injectable()
export class CreateMaterial_consumibleUseCase {
  constructor(
    private readonly material_consumibleRepository: Material_consumibleRepository,
    private readonly findOneMateriale: FindOneMaterialeUseCase,
    private readonly dataSource: DataSource,
  ) {}

  async execute(dto: CreateMaterial_consumibleDto): Promise<Material_consumible> {
    const materiale = await this.findOneMateriale.execute(dto.materialeId);

    let creado: Material_consumible;
    try {
      const material_consumible = new Material_consumible({
        stockActual:      dto.stockIngreso,
        stockMinimo:      dto.stockMinimo,
        unidadMedida:     dto.unidadMedida,
        fechaVencimiento: dto.fechaVencimiento ? new Date(dto.fechaVencimiento) : undefined,
        estado:           dto.estado,
        materiale,
      });
      creado = await this.material_consumibleRepository.create(material_consumible);
    } catch (error) {
      handleDbErrors(error);
    }

    // Primer movimiento del consumible: saldo = stockIngreso
    await this.dataSource.getRepository(MovimientoOrmEntity).save({
      tipo:               MovimientoTipo.ENTRADA,
      cantidad:           dto.stockIngreso,
      saldo:              dto.stockIngreso,
      descripcion:        `Ingreso inicial: ${materiale.nombre} (${dto.stockIngreso} ${dto.unidadMedida})`,
      estado:             MovimientoEstado.ACTIVO,
      materialConsumible: { id: creado!.id },
      ...(dto.usuarioId && { usuario: { id: dto.usuarioId } }),
    });

    return creado!;
  }
}
