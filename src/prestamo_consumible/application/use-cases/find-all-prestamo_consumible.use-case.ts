import { Injectable } from '@nestjs/common';
import { PrestamoConsumibleRepository } from '../../domain/prestamo_consumible.repository';

@Injectable()
export class FindAllPrestamoConsumibleUseCase {
  constructor(private readonly repo: PrestamoConsumibleRepository) {}
  async execute() { return this.repo.findAll(); }
}
