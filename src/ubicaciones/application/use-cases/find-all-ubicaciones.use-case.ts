import { UbicacionRepository } from '../../domain/ubicacion.repository';
import { Ubicacion } from '../../domain/ubicacion.entity';

export class FindAllUbicacionesUseCase {
  constructor(private readonly repository: UbicacionRepository) {}

  async execute(): Promise<Ubicacion[]> {
    return this.repository.findAll();
  }
}
