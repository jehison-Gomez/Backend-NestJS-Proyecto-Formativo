import { Injectable, NotFoundException } from '@nestjs/common';
import { FichaRepository } from '../../domain/ficha.repository';
import { UpdateFichaDto } from '../dto/update-ficha.dto';
import { Ficha } from '../../domain/ficha.entity';
import { handleDbErrors } from '../handle-db-errors';
import { FindOneProgramaUseCase } from 'src/programas/application/use-cases/find-one-programa.use-case';
import { FindOneUsuarioUseCase } from 'src/usuarios/application/use-cases/find-one-usuario.use-case';

@Injectable()
export class UpdateFichaUseCase {
  constructor(
    private readonly fichaRepository: FichaRepository,
    private readonly findOnePrograma: FindOneProgramaUseCase,
    private readonly findOneUsuario: FindOneUsuarioUseCase,
  ) {}

  async execute(id: string, dto: UpdateFichaDto): Promise<Ficha> {
    const exists = await this.fichaRepository.findOne(id);
    if (!exists) throw new NotFoundException(`Ficha #${id} no encontrado`);

    const partial: Partial<Ficha> = {};
    if (dto.codigoFicha !== undefined) partial.codigoFicha = dto.codigoFicha;
    if (dto.fechaInicio !== undefined) partial.fechaInicio = new Date(dto.fechaInicio);
    if (dto.fechaFin    !== undefined) partial.fechaFin    = new Date(dto.fechaFin);
    if (dto.estado      !== undefined) partial.estado      = dto.estado;

    if (dto.programaId    !== undefined) partial.programa      = await this.findOnePrograma.execute(dto.programaId);
    if (dto.usuarioLiderId !== undefined) partial.usuarioLider = await this.findOneUsuario.execute(dto.usuarioLiderId);

    try {
      return await this.fichaRepository.update(id, partial);
    } catch (error) {
      handleDbErrors(error);
    }
  }
}
