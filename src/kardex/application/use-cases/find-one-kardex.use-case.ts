import { Injectable, NotFoundException } from '@nestjs/common';
import { KardexRepository } from '../../domain/kardex.repository';

@Injectable()
export class FindOneKardexUseCase {
  constructor(private readonly kardexRepository: KardexRepository) {}

  async execute(id: string) {
    const found = await this.kardexRepository.findOne(id);
    if (!found) throw new NotFoundException(`Kardex #${id} no encontrado`);
    return found;
  }
}
