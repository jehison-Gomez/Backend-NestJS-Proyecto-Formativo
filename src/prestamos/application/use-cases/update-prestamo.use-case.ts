import { Injectable, NotFoundException } from '@nestjs/common';
import { PrestamoRepository } from '../../domain/prestamo.repository';
import { UpdatePrestamoDto } from '../dto/update-prestamo.dto';
import { Prestamo } from '../../domain/prestamo.entity';
import { handleDbErrors } from '../handle-db-errors';
import { FindOneUsuarioUseCase } from 'src/usuarios/application/use-cases/find-one-usuario.use-case';
import { FindOneFichaUseCase } from 'src/fichas/application/use-cases/find-one-ficha.use-case';
import { Usuario } from 'src/usuarios/domain/usuario.entity';

@Injectable()
export class UpdatePrestamoUseCase {
  constructor(
    private readonly prestamoRepository: PrestamoRepository,
    private readonly findOneUsuario: FindOneUsuarioUseCase,
    private readonly findOneFicha: FindOneFichaUseCase,
  ) {}

  async execute(id: string, dto: UpdatePrestamoDto): Promise<Prestamo> {
    const exists = await this.prestamoRepository.findOne(id);
    if (!exists) throw new NotFoundException(`Prestamo #${id} no encontrado`);

    const partial: Partial<Prestamo> = {};
    if (dto.motivo                  !== undefined) partial.motivo                  = dto.motivo;
    if (dto.observacion             !== undefined) partial.observacion             = dto.observacion;
    if (dto.fechaInicio             !== undefined) partial.fechaInicio             = new Date(dto.fechaInicio);
    if (dto.fechaFin                !== undefined) partial.fechaFin                = new Date(dto.fechaFin);
    if (dto.fechaDevolucionEsperada !== undefined) partial.fechaDevolucionEsperada = new Date(dto.fechaDevolucionEsperada);
    if (dto.estado                  !== undefined) partial.estado                  = dto.estado;
    if (dto.solicitanteId           !== undefined) partial.solicitante             = await this.findOneUsuario.execute(dto.solicitanteId);
    if (dto.fichaId                 !== undefined) partial.ficha                   = await this.findOneFicha.execute(dto.fichaId);

    if (dto.beneficiariosIds !== undefined) {
      const beneficiarios: Usuario[] = [];
      for (const uid of dto.beneficiariosIds) {
        beneficiarios.push(await this.findOneUsuario.execute(uid));
      }
      partial.beneficiarios = beneficiarios;
    }

    try {
      return await this.prestamoRepository.update(id, partial);
    } catch (error) {
      handleDbErrors(error);
    }
  }
}
