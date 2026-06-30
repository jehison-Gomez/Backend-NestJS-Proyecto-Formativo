import { Injectable } from '@nestjs/common';
import { UbicacionRepository } from '../../domain/ubicacion.repository';
import { CreateUbicacionDto } from '../dto/create-ubicacion.dto';
import { Ubicacion } from '../../domain/ubicacion.entity';
import { handleDbErrors } from '../handle-db-errors';
import { FindOneTipo_ubicacionUseCase } from 'src/tipo_ubicacion/application/use-cases/find-one-tipo_ubicacion.use-case';
import { FindOneAreaUseCase } from 'src/areas/application/use-cases/find-one-area.use-case';

@Injectable()
export class CreateUbicacionUseCase {
  constructor(
    private readonly ubicacionRepository: UbicacionRepository,
    private readonly findOneTipoUbicacion: FindOneTipo_ubicacionUseCase,
    private readonly findOneArea: FindOneAreaUseCase,
  ) {}

  async execute(dto: CreateUbicacionDto): Promise<Ubicacion> {
    const tipoUbicacion = await this.findOneTipoUbicacion.execute(dto.tipoUbicacionId);
    const area          = await this.findOneArea.execute(dto.areaId);

    try {
      const ubicacion = new Ubicacion({
        nombre:       dto.nombre,
        descripcion:  dto.descripcion,
        estado:       dto.estado,
        tipoUbicacion,
        area,
      });
      return await this.ubicacionRepository.create(ubicacion);
    } catch (error) {
      handleDbErrors(error);
    }
  }
}
