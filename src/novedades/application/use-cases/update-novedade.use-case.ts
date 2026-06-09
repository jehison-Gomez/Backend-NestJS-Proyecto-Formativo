import { Injectable, NotFoundException } from '@nestjs/common';
import { NovedadeRepository } from '../../domain/novedade.repository';
import { UpdateNovedadeDto } from '../dto/update-novedade.dto';
import { Novedade } from '../../domain/novedade.entity';
import { handleDbErrors } from '../handle-db-errors';
import { FindOneUsuarioUseCase } from 'src/usuarios/application/use-cases/find-one-usuario.use-case';

@Injectable()
export class UpdateNovedadeUseCase {
  constructor(
    private readonly novedadeRepository: NovedadeRepository,
    private readonly findOneUsuario: FindOneUsuarioUseCase,
  ) {}

  async execute(id: string, dto: UpdateNovedadeDto): Promise<Novedade> {
    const exists = await this.novedadeRepository.findOne(id);
    if (!exists) throw new NotFoundException(`Novedad #${id} no encontrada`);

    const partial: Partial<Novedade> = {};
    if (dto.descripcion      !== undefined) partial.descripcion      = dto.descripcion;
    if (dto.tipo             !== undefined) partial.tipo             = dto.tipo;
    if (dto.estado           !== undefined) partial.estado           = dto.estado;
    if (dto.reportadoPorId   !== undefined) partial.reportadoPor     = await this.findOneUsuario.execute(dto.reportadoPorId);
    if (dto.devolucionItemId !== undefined) partial.devolucionItemId = dto.devolucionItemId;

    try {
      return await this.novedadeRepository.update(id, partial);
    } catch (error) {
      handleDbErrors(error);
    }
  }
}
