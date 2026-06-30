import { Injectable } from '@nestjs/common';
import { DevolucionItemRepository } from '../../domain/devolucion_item.repository';

@Injectable()
export class FindAllDevolucionItemUseCase {
  constructor(private readonly repo: DevolucionItemRepository) {}
  async execute() { return this.repo.findAll(); }
}
