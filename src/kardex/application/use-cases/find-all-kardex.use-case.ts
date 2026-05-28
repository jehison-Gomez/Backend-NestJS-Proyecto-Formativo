import { Injectable } from '@nestjs/common';
import { KardexRepository } from '../../domain/kardex.repository';
import { Kardex } from '../../domain/kardex.entity';

@Injectable()
export class FindAllKardexUseCase {
  constructor(private readonly kardexRepository: KardexRepository) {}

  async execute(): Promise<Kardex[]> {
    return this.kardexRepository.findAll();
  }
}
