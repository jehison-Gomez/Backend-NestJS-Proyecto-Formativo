import { Injectable } from '@nestjs/common';
import { KardexRepository } from '../../domain/kardex.repository';
import { CreateKardexDto } from '../dto/create-kardex.dto';
import { Kardex } from '../../domain/kardex.entity';
import { handleDbErrors } from '../handle-db-errors';

@Injectable()
export class CreateKardexUseCase {
  constructor(private readonly kardexRepository: KardexRepository) {}

  async execute(dto: CreateKardexDto): Promise<Kardex> {
    try {
      // Si es CONSUMIBLE: llena materialConsumibleId, saldoAnterior y saldoActual
      // Si es ITEM: llena materialItemId, cantidad siempre = 1, saldos son null
      const kardex = new Kardex({
        movimientoId:         dto.movimientoId,
        fichaId:              dto.fichaId,
        usuarioId:            dto.usuarioId,
        prestamoId:           dto.prestamoId ?? null,
        devolucionId:         dto.devolucionId ?? null,
        materialConsumibleId: dto.materialConsumibleId ?? null,
        materialItemId:       dto.materialItemId ?? null,
        cantidad:             dto.materialItemId ? 1 : dto.cantidad,
        saldoAnterior:        dto.materialItemId ? null : (dto.saldoAnterior ?? null),
        saldoActual:          dto.materialItemId ? null : (dto.saldoActual ?? null),
        estado:               dto.estado,
      });
      return await this.kardexRepository.create(kardex);
    } catch (error) {
      handleDbErrors(error);
    }
  }
}
