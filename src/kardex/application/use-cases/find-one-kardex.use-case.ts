import { Injectable, NotFoundException } from '@nestjs/common';
import { KardexRepository } from '../../domain/kardex.repository';
import { Kardex } from '../../domain/kardex.entity';

@Injectable()
export class FindOneKardexUseCase {
  constructor(private readonly kardexRepository: KardexRepository) {}

  async execute(id: string): Promise<Kardex> {
    const kardex = await this.kardexRepository.findOne(id);
    if (!kardex) throw new NotFoundException(`Kardex #${id} no encontrado`);
    return kardex;
  }
}
