import { Injectable } from '@nestjs/common';
import { Tipo_ubicacionRepository } from '../../domain/tipo_ubicacion.repository';
import { Tipo_ubicacion } from '../../domain/tipo_ubicacion.entity';

@Injectable()
export class FindAllTipo_ubicacionUseCase {
  constructor(private readonly tipo_ubicacionRepository: Tipo_ubicacionRepository) {}

  async execute(): Promise<Tipo_ubicacion[]> {
    return this.tipo_ubicacionRepository.findAll();
  }
}
