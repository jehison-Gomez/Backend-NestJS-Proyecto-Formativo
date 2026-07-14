import { Injectable, NotFoundException } from '@nestjs/common';
import { UbicacionRepository } from '../../domain/ubicacion.repository';
import { UpdateUbicacionDto } from '../dto/update-ubicacion.dto';
import { Ubicacion } from '../../domain/ubicacion.entity';
import { handleDbErrors } from '../handle-db-errors';
import { FindOneTipo_ubicacionUseCase } from 'src/tipo_ubicacion/application/use-cases/find-one-tipo_ubicacion.use-case';
import { FindOneAreaUseCase } from 'src/areas/application/use-cases/find-one-area.use-case';
import { FindOneUsuarioUseCase } from 'src/usuarios/application/use-cases/find-one-usuario.use-case';

@Injectable()
export class UpdateUbicacionUseCase {
  constructor(
    private readonly ubicacionRepository: UbicacionRepository,
    private readonly findOneTipoUbicacion: FindOneTipo_ubicacionUseCase,
    private readonly findOneArea: FindOneAreaUseCase,
    private readonly findOneUsuario: FindOneUsuarioUseCase,
  ) {}

  async execute(id: string, dto: UpdateUbicacionDto): Promise<Ubicacion> {
    const exists = await this.ubicacionRepository.findOne(id);
    if (!exists) throw new NotFoundException(`Ubicacion #${id} no encontrado`);

    const partial: Partial<Ubicacion> = {};
    if (dto.nombre          !== undefined) partial.nombre         = dto.nombre;
    if (dto.descripcion     !== undefined) partial.descripcion    = dto.descripcion;
    if (dto.estado          !== undefined) partial.estado         = dto.estado;
    if (dto.tipoUbicacionId !== undefined) partial.tipoUbicacion  = await this.findOneTipoUbicacion.execute(dto.tipoUbicacionId);
    if (dto.areaId          !== undefined) partial.area           = await this.findOneArea.execute(dto.areaId);
    if (dto.encargadoId     !== undefined) {
      partial.encargado = dto.encargadoId
        ? await this.findOneUsuario.execute(dto.encargadoId)
        : null;
    }

    try {
      return await this.ubicacionRepository.update(id, partial);
    } catch (error) {
      handleDbErrors(error);
    }
  }
}
