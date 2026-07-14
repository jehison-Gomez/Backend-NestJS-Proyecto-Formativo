import { Injectable } from '@nestjs/common';
import { PrestamoRepository } from '../../domain/prestamo.repository';
import { Prestamo } from '../../domain/prestamo.entity';

@Injectable()
export class FindPorBodegaUseCase {
  constructor(private readonly prestamoRepository: PrestamoRepository) {}

  async execute(userId: string): Promise<Prestamo[]> {
    return this.prestamoRepository.findByEncargado(userId);
  }
}
