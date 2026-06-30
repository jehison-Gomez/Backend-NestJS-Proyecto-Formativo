import { BadRequestException, Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { MovimientoRepository } from '../../domain/movimiento.repository';
import { CreateMovimientoDto } from '../dto/create-movimiento.dto';
import { Movimiento } from '../../domain/movimiento.entity';
import { handleDbErrors } from '../handle-db-errors';
import { MovimientoTipo } from '../../domain/movimiento-tipo.enum';
import { KardexEstado } from 'src/kardex/domain/kardex-estado.enum';
import { Material_consumibleOrmEntity } from 'src/material_consumible/infrastructure/persistence/material_consumible.orm-entity';
import { CreateKardexUseCase } from 'src/kardex/application/use-cases/create-kardex.use-case';

const TIPOS_SALIDA = new Set<MovimientoTipo>([
  MovimientoTipo.SALIDA_PRESTAMO,
  MovimientoTipo.AJUSTE_NEGATIVO,
  MovimientoTipo.BAJA,
]);

const TIPOS_ENTRADA = new Set<MovimientoTipo>([
  MovimientoTipo.ENTRADA,
  MovimientoTipo.DEVOLUCION,
  MovimientoTipo.AJUSTE_POSITIVO,
]);

@Injectable()
export class CreateMovimientoUseCase {
  constructor(
    private readonly movimientoRepository: MovimientoRepository,
    private readonly createKardexUseCase: CreateKardexUseCase,
    private readonly dataSource: DataSource,
  ) {}

  async execute(dto: CreateMovimientoDto): Promise<Movimiento> {
    const esSalida = TIPOS_SALIDA.has(dto.tipo);
    const esEntrada = TIPOS_ENTRADA.has(dto.tipo);
    const repo = this.dataSource.getRepository(Material_consumibleOrmEntity);

    let consumibleActual: Material_consumibleOrmEntity | null = null;

    // 1. Validar stock antes de SALIDA
    if (esSalida && dto.materialConsumibleId) {
      consumibleActual = await repo.findOne({ where: { id: dto.materialConsumibleId } });
      if (!consumibleActual || Number(consumibleActual.stockActual) < dto.cantidad) {
        throw new BadRequestException(
          `Stock insuficiente: disponible ${consumibleActual?.stockActual ?? 0}, solicitado ${dto.cantidad}`,
        );
      }
    }

    let movimiento: Movimiento;
    try {
      movimiento = await this.movimientoRepository.create(
        new Movimiento({
          tipo:               dto.tipo,
          cantidad:           dto.cantidad,
          descripcion:        dto.descripcion ?? `Movimiento ${dto.tipo}`,
          estado:             dto.estado,
          prestamo:           dto.prestamoId           ? { id: dto.prestamoId }           as any : null,
          devolucion:         dto.devolucionId          ? { id: dto.devolucionId }          as any : null,
          materialItem:       dto.materialItemId        ? { id: dto.materialItemId }        as any : null,
          materialConsumible: dto.materialConsumibleId  ? { id: dto.materialConsumibleId }  as any : null,
          usuario:            dto.usuarioId             ? { id: dto.usuarioId }             as any : null,
        }),
      );
    } catch (error) {
      handleDbErrors(error);
    }

    // 2. Actualizar stockActual del consumible
    let saldoAnterior: number | undefined;
    let saldoActual: number | undefined;

    if (dto.materialConsumibleId && (esSalida || esEntrada)) {
      if (!consumibleActual) {
        consumibleActual = await repo.findOne({ where: { id: dto.materialConsumibleId } });
      }
      if (consumibleActual) {
        saldoAnterior = Number(consumibleActual.stockActual);
        const delta = esSalida ? -dto.cantidad : dto.cantidad;
        saldoActual = Math.max(0, saldoAnterior + delta);
        await repo.update({ id: dto.materialConsumibleId }, { stockActual: saldoActual });
      }
    }

    // 3. Auto-generar KARDEX si hay fichaId y usuarioId
    if (movimiento! && dto.fichaId && dto.usuarioId) {
      try {
        await this.createKardexUseCase.execute({
          movimientoId:         movimiento!.id,
          fichaId:              dto.fichaId,
          usuarioId:            dto.usuarioId,
          prestamoId:           dto.prestamoId,
          devolucionId:         dto.devolucionId,
          materialConsumibleId: dto.materialConsumibleId,
          materialItemId:       dto.materialItemId,
          cantidad:             dto.cantidad,
          saldoAnterior,
          saldoActual,
          estado:               KardexEstado.ACTIVO,
        });
      } catch {
        // KARDEX falla silenciosamente para no revertir el movimiento
      }
    }

    return movimiento!;
  }
}
