import { Injectable, NotFoundException } from '@nestjs/common';
import { NovedadeRepository } from '../../domain/novedade.repository';
import { UpdateNovedadeDto } from '../dto/update-novedade.dto';
import { Novedade } from '../../domain/novedade.entity';
import { handleDbErrors } from '../handle-db-errors';
import { FindOneUsuarioUseCase } from 'src/usuarios/application/use-cases/find-one-usuario.use-case';
import { FindOneDevolucioneUseCase } from 'src/devoluciones/application/use-cases/find-one-devolucione.use-case';

@Injectable()
export class UpdateNovedadeUseCase {
  constructor(
    private readonly novedadeRepository: NovedadeRepository,
    private readonly findOneUsuario: FindOneUsuarioUseCase,
    private readonly findOneDevolucion: FindOneDevolucioneUseCase,
  ) {}

  async execute(id: string, dto: UpdateNovedadeDto): Promise<Novedade> {
    const exists = await this.novedadeRepository.findOne(id);
    if (!exists) throw new NotFoundException(`Novedad #${id} no encontrada`);

    const partial: Partial<Novedade> = {};
    if (dto.descripcion  !== undefined) partial.descripcion = dto.descripcion;
    if (dto.tipo         !== undefined) partial.tipo        = dto.tipo;
    if (dto.estado       !== undefined) partial.estado      = dto.estado;
    if (dto.usuarioId    !== undefined) partial.usuario     = await this.findOneUsuario.execute(dto.usuarioId);
    if (dto.devolucionId !== undefined) partial.devolucion  = await this.findOneDevolucion.execute(dto.devolucionId);

    try {
      return await this.novedadeRepository.update(id, partial);
    } catch (error) {
      handleDbErrors(error);
    }
  }
}
