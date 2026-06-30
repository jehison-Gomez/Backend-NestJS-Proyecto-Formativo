import { Injectable } from '@nestjs/common';
import { FichaRepository } from '../../domain/ficha.repository';
import { CreateFichaDto } from '../dto/create-ficha.dto';
import { Ficha } from '../../domain/ficha.entity';
import { handleDbErrors } from '../handle-db-errors';
import { FindOneProgramaUseCase } from 'src/programas/application/use-cases/find-one-programa.use-case';
import { FindOneUsuarioUseCase } from 'src/usuarios/application/use-cases/find-one-usuario.use-case';

@Injectable()
export class CreateFichaUseCase {
  constructor(
    private readonly fichaRepository: FichaRepository,
    private readonly findOnePrograma: FindOneProgramaUseCase,
    private readonly findOneUsuario: FindOneUsuarioUseCase,
  ) {}

  async execute(dto: CreateFichaDto): Promise<Ficha> {
    const programa = await this.findOnePrograma.execute(dto.programaId);

    const usuarioLider = dto.usuarioLiderId
      ? await this.findOneUsuario.execute(dto.usuarioLiderId)
      : undefined;

    try {
      const ficha = new Ficha({
        codigoFicha: dto.codigoFicha,
        fechaInicio: new Date(dto.fechaInicio),
        fechaFin: new Date(dto.fechaFin),
        estado: dto.estado,
        programa,
        usuarioLider,
      });
      return await this.fichaRepository.create(ficha);
    } catch (error) {
      handleDbErrors(error);
    }
  }
}
