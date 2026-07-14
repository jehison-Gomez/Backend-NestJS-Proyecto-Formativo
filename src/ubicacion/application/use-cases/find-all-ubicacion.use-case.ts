import { Injectable } from '@nestjs/common';
import { UbicacionRepository } from '../../domain/ubicacion.repository';
import { Ubicacion } from '../../domain/ubicacion.entity';

@Injectable()
export class FindAllUbicacionUseCase {
  constructor(private readonly ubicacionRepository: UbicacionRepository) {}

  async execute(sedeId?: string | null): Promise<Ubicacion[]> {
    return this.ubicacionRepository.findAll(sedeId);
  }
}
