import { Injectable } from '@nestjs/common';
import { PrestamoRepository } from '../../domain/prestamo.repository';
import { Prestamo } from '../../domain/prestamo.entity';

@Injectable()
export class FindAllPrestamosUseCase {
  constructor(private readonly prestamoRepository: PrestamoRepository) {}

  async execute(sedeId?: string | null): Promise<Prestamo[]> {
    return this.prestamoRepository.findAll(sedeId);
  }
}
