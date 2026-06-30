import { Injectable, NotFoundException } from '@nestjs/common';
import { Tipo_ubicacionRepository } from '../../domain/tipo_ubicacion.repository';
import { UpdateTipo_ubicacionDto } from '../dto/update-tipo_ubicacion.dto';
import { Tipo_ubicacion } from '../../domain/tipo_ubicacion.entity';
import { handleDbErrors } from '../handle-db-errors';

@Injectable()
export class UpdateTipo_ubicacionUseCase {
  constructor(private readonly tipo_ubicacionRepository: Tipo_ubicacionRepository) {}

  async execute(id: string, dto: UpdateTipo_ubicacionDto): Promise<Tipo_ubicacion> {
    const exists = await this.tipo_ubicacionRepository.findOne(id);
    if (!exists) throw new NotFoundException(`Tipo_ubicacion #${id} no encontrado`);

    try {
      return await this.tipo_ubicacionRepository.update(id, dto);
    } catch (error) {
      handleDbErrors(error);
    }
  }
}
