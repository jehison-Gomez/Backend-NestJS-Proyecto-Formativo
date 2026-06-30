import { Injectable } from '@nestjs/common';
import { KardexRepository } from '../../domain/kardex.repository';

@Injectable()
export class FindAllKardexUseCase {
  constructor(private readonly kardexRepository: KardexRepository) {}
  async execute() { return this.kardexRepository.findAll(); }
}
