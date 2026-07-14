import { Injectable } from '@nestjs/common';
import { PrestamoHistorialRepository } from '../../domain/prestamo_historial.repository';
import { PrestamoHistorial } from '../../domain/prestamo_historial.entity';

@Injectable()
export class FindByPrestamoPrestamoHistorialUseCase {
  constructor(private readonly repo: PrestamoHistorialRepository) {}

  execute(prestamoId: string): Promise<PrestamoHistorial[]> {
    return this.repo.findByPrestamo(prestamoId);
  }
}
