import { Injectable } from '@nestjs/common';
import { PrestamoRepository } from '../../domain/prestamo.repository';
import { Prestamo } from '../../domain/prestamo.entity';

@Injectable()
export class FindAllPrestamosUseCase {
  constructor(private readonly prestamoRepository: PrestamoRepository) {}

  async execute(): Promise<Prestamo[]> {
    return this.prestamoRepository.findAll();
  }
}
