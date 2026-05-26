import { Injectable, NotFoundException } from '@nestjs/common';
import { Tipo_ubicacionRepository } from '../../domain/tipo_ubicacion.repository';
import { Tipo_ubicacion } from '../../domain/tipo_ubicacion.entity';

@Injectable()
export class FindOneTipo_ubicacionUseCase {
  constructor(private readonly tipo_ubicacionRepository: Tipo_ubicacionRepository) {}

  async execute(id: string): Promise<Tipo_ubicacion> {
    const tipo_ubicacion = await this.tipo_ubicacionRepository.findOne(id);
    if (!tipo_ubicacion) throw new NotFoundException(`Tipo_ubicacion #${id} no encontrado`);
    return tipo_ubicacion;
  }
}
