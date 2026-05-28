import { Injectable, NotFoundException } from '@nestjs/common';
import { AprobacioneRepository } from '../../domain/aprobacione.repository';
import { UpdateAprobacioneDto } from '../dto/update-aprobacione.dto';
import { Aprobacione } from '../../domain/aprobacione.entity';
import { handleDbErrors } from '../handle-db-errors';
import { FindOnePrestamoUseCase } from 'src/prestamos/application/use-cases/find-one-prestamo.use-case';
import { FindOneUsuarioUseCase } from 'src/usuarios/application/use-cases/find-one-usuario.use-case';

@Injectable()
export class UpdateAprobacioneUseCase {
  constructor(
    private readonly aprobacioneRepository: AprobacioneRepository,
    private readonly findOnePrestamo: FindOnePrestamoUseCase,
    private readonly findOneUsuario: FindOneUsuarioUseCase,
  ) {}

  async execute(id: string, dto: UpdateAprobacioneDto): Promise<Aprobacione> {
    const exists = await this.aprobacioneRepository.findOne(id);
    if (!exists) throw new NotFoundException(`Aprobacione #${id} no encontrado`);

    const partial: Partial<Aprobacione> = {};
    if (dto.decision    !== undefined) partial.decision    = dto.decision;
    if (dto.observacion !== undefined) partial.observacion = dto.observacion;
    if (dto.estado      !== undefined) partial.estado      = dto.estado;
    if (dto.prestamoId  !== undefined) partial.prestamo    = await this.findOnePrestamo.execute(dto.prestamoId);
    if (dto.usuarioId   !== undefined) partial.usuario     = await this.findOneUsuario.execute(dto.usuarioId);

    try {
      return await this.aprobacioneRepository.update(id, partial);
    } catch (error) {
      handleDbErrors(error);
    }
  }
}
