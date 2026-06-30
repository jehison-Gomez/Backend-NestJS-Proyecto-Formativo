import { Injectable } from '@nestjs/common';
import { Tipo_ubicacionRepository } from '../../domain/tipo_ubicacion.repository';
import { CreateTipo_ubicacionDto } from '../dto/create-tipo_ubicacion.dto';
import { Tipo_ubicacion } from '../../domain/tipo_ubicacion.entity';
import { handleDbErrors } from '../handle-db-errors';

@Injectable()
export class CreateTipo_ubicacionUseCase {
  constructor(private readonly tipo_ubicacionRepository: Tipo_ubicacionRepository) {}

  async execute(dto: CreateTipo_ubicacionDto): Promise<Tipo_ubicacion> {
    try {
      const tipo_ubicacion = new Tipo_ubicacion({ ...dto });
      return await this.tipo_ubicacionRepository.create(tipo_ubicacion);
    } catch (error) {
      handleDbErrors(error);
    }
  }
}
