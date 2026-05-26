import { Injectable, NotFoundException } from '@nestjs/common';
import { AreaRepository } from '../../domain/area.repository';
import { UpdateAreaDto } from '../dto/update-area.dto';
import { Area } from '../../domain/area.entity';
import { handleDbErrors } from '../handle-db-errors';
import { FindOneSedeUseCase } from 'src/sedes/application/use-cases/find-one-sede.use-case';
import { FindOneUsuarioUseCase } from 'src/usuarios/application/use-cases/find-one-usuario.use-case';

@Injectable()
export class UpdateAreaUseCase {
  constructor(
    private readonly areaRepository: AreaRepository,
    private readonly findOneSede: FindOneSedeUseCase,
    private readonly findOneUsuario: FindOneUsuarioUseCase,
  ) {}

  async execute(id: string, dto: UpdateAreaDto): Promise<Area> {
    const exists = await this.areaRepository.findOne(id);
    if (!exists) throw new NotFoundException(`Area #${id} no encontrado`);

    const partial: Partial<Area> = {};
    if (dto.nombre       !== undefined) partial.nombre       = dto.nombre;
    if (dto.descripcion  !== undefined) partial.descripcion  = dto.descripcion;
    if (dto.estado       !== undefined) partial.estado       = dto.estado;
    if (dto.sedeId       !== undefined) partial.sede         = await this.findOneSede.execute(dto.sedeId);
    if (dto.usuarioLiderId !== undefined) partial.usuarioLider = await this.findOneUsuario.execute(dto.usuarioLiderId);

    try {
      return await this.areaRepository.update(id, partial);
    } catch (error) {
      handleDbErrors(error);
    }
  }
}
