import { UbicacionRepository } from '../../domain/ubicacion.repository';

export class RemoveUbicacionUseCase {
  constructor(private readonly repository: UbicacionRepository) {}

  async execute(id: string) { // Corregido a string
    await this.repository.delete(id);
  }
}