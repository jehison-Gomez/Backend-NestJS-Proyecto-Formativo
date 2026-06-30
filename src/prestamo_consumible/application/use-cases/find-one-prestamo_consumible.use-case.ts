import { Injectable, NotFoundException } from '@nestjs/common';
import { PrestamoConsumibleRepository } from '../../domain/prestamo_consumible.repository';

@Injectable()
export class FindOnePrestamoConsumibleUseCase {
  constructor(private readonly repo: PrestamoConsumibleRepository) {}

  async execute(id: string) {
    const found = await this.repo.findOne(id);
    if (!found) throw new NotFoundException(`PrestamoConsumible #${id} no encontrado`);
    return found;
  }
}
