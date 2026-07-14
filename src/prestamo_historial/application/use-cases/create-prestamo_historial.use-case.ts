import { Injectable } from '@nestjs/common';
import { PrestamoHistorialRepository } from '../../domain/prestamo_historial.repository';
import { PrestamoHistorial } from '../../domain/prestamo_historial.entity';

@Injectable()
export class CreatePrestamoHistorialUseCase {
  constructor(private readonly repo: PrestamoHistorialRepository) {}

  execute(data: Omit<PrestamoHistorial, 'id' | 'creadoEn'>): Promise<PrestamoHistorial> {
    return this.repo.create(new PrestamoHistorial(data));
  }
}
