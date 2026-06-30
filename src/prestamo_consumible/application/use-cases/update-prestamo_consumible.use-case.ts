import { Injectable, NotFoundException } from '@nestjs/common';
import { PrestamoConsumibleRepository } from '../../domain/prestamo_consumible.repository';
import { UpdatePrestamoConsumibleDto } from '../dto/update-prestamo_consumible.dto';
import { handleDbErrors } from '../handle-db-errors';

@Injectable()
export class UpdatePrestamoConsumibleUseCase {
  constructor(private readonly repo: PrestamoConsumibleRepository) {}

  async execute(id: string, dto: UpdatePrestamoConsumibleDto) {
    const exists = await this.repo.findOne(id);
    if (!exists) throw new NotFoundException(`PrestamoConsumible #${id} no encontrado`);
    try {
      return await this.repo.update(id, dto);
    } catch (error) {
      handleDbErrors(error);
    }
  }
}
