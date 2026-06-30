import { Injectable } from '@nestjs/common';
import { PrestamoConsumibleRepository } from '../../domain/prestamo_consumible.repository';
import { CreatePrestamoConsumibleDto } from '../dto/create-prestamo_consumible.dto';
import { PrestamoConsumible } from '../../domain/prestamo_consumible.entity';
import { handleDbErrors } from '../handle-db-errors';

@Injectable()
export class CreatePrestamoConsumibleUseCase {
  constructor(private readonly repo: PrestamoConsumibleRepository) {}

  async execute(dto: CreatePrestamoConsumibleDto): Promise<PrestamoConsumible> {
    try {
      const pc = new PrestamoConsumible({
        prestamoId:           dto.prestamoId,
        materialConsumibleId: dto.materialConsumibleId,
        cantidadSolicitada:   dto.cantidadSolicitada,
        cantidadAprobada:     dto.cantidadAprobada ?? null,
        observacion:          dto.observacion,
        estado:               dto.estado,
      });
      return await this.repo.create(pc);
    } catch (error) {
      handleDbErrors(error);
    }
  }
}
