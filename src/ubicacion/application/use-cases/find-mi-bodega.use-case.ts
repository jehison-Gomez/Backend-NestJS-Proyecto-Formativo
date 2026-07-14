import { Injectable } from '@nestjs/common';
import { UbicacionRepository } from '../../domain/ubicacion.repository';
import { Ubicacion } from '../../domain/ubicacion.entity';

@Injectable()
export class FindMiBodegaUseCase {
  constructor(private readonly ubicacionRepository: UbicacionRepository) {}

  async execute(userId: string): Promise<Ubicacion[]> {
    return this.ubicacionRepository.findByEncargadoId(userId);
  }
}
