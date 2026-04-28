import { MaterialRepository } from '../../domain/material.repository';

export class RemoveMaterialUseCase {
  constructor(private readonly repository: MaterialRepository) {}

  async execute(id: number): Promise<void> {
    await this.repository.delete(id);
  }
}
