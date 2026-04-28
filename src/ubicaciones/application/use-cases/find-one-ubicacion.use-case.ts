import { UbicacionRepository } from '../../domain/ubicacion.repository';

export class FindOneUbicacionUseCase {
  constructor(private readonly repository: UbicacionRepository) {}

  async execute(id: string) { // Corregido a string
    return this.repository.findById(id);
  }
}