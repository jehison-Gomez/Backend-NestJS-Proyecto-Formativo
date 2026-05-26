import { Injectable, NotFoundException } from '@nestjs/common';
import { UbicacionRepository } from '../../domain/ubicacion.repository';
import { Ubicacion } from '../../domain/ubicacion.entity';

@Injectable()
export class FindOneUbicacionUseCase {
  constructor(private readonly ubicacionRepository: UbicacionRepository) {}

  async execute(id: string): Promise<Ubicacion> {
    const ubicacion = await this.ubicacionRepository.findOne(id);
    if (!ubicacion) throw new NotFoundException(`Ubicacion #${id} no encontrado`);
    return ubicacion;
  }
}
