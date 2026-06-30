import { Injectable } from '@nestjs/common';
import { PrestamoConsumibleRepository } from '../../domain/prestamo_consumible.repository';

@Injectable()
export class FindByPrestamoPrestamoConsumibleUseCase {
  constructor(private readonly repo: PrestamoConsumibleRepository) {}
  async execute(prestamoId: string) { return this.repo.findByPrestamo(prestamoId); }
}
