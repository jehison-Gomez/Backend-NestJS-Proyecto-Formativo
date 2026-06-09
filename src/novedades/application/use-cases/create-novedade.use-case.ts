import { Injectable } from '@nestjs/common';
import { NovedadeRepository } from '../../domain/novedade.repository';
import { CreateNovedadeDto } from '../dto/create-novedade.dto';
import { Novedade } from '../../domain/novedade.entity';
import { handleDbErrors } from '../handle-db-errors';
import { FindOneUsuarioUseCase } from 'src/usuarios/application/use-cases/find-one-usuario.use-case';

@Injectable()
export class CreateNovedadeUseCase {
  constructor(
    private readonly novedadeRepository: NovedadeRepository,
    private readonly findOneUsuario: FindOneUsuarioUseCase,
  ) {}

  async execute(dto: CreateNovedadeDto): Promise<Novedade> {
    const reportadoPor = await this.findOneUsuario.execute(dto.reportadoPorId);

    try {
      const novedade = new Novedade({
        descripcion:     dto.descripcion,
        tipo:            dto.tipo,
        estado:          dto.estado,
        reportadoPor,
        devolucionItemId: dto.devolucionItemId ?? null,
      });
      return await this.novedadeRepository.create(novedade);
    } catch (error) {
      handleDbErrors(error);
    }
  }
}
