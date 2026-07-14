import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { PrestamoConsumibleRepository } from '../../domain/prestamo_consumible.repository';
import { CreatePrestamoConsumibleDto } from '../dto/create-prestamo_consumible.dto';
import { PrestamoConsumible } from '../../domain/prestamo_consumible.entity';
import { handleDbErrors } from '../handle-db-errors';
import { Material_consumibleRepository } from 'src/material_consumible/domain/material_consumible.repository';

@Injectable()
export class CreatePrestamoConsumibleUseCase {
  constructor(
    private readonly repo: PrestamoConsumibleRepository,
    private readonly consumibleRepository: Material_consumibleRepository,
  ) {}

  async execute(dto: CreatePrestamoConsumibleDto): Promise<PrestamoConsumible> {
    // Validar que el consumible exista y tenga stock suficiente
    const consumible = await this.consumibleRepository.findOne(dto.materialConsumibleId);
    if (!consumible) throw new NotFoundException(`Consumible #${dto.materialConsumibleId} no encontrado`);

    if (Number(consumible.stockActual) < Number(dto.cantidadSolicitada)) {
      throw new BadRequestException(
        `Stock insuficiente. Solicitado: ${dto.cantidadSolicitada} ${consumible.unidadMedida}, disponible: ${consumible.stockActual} ${consumible.unidadMedida}`,
      );
    }

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
