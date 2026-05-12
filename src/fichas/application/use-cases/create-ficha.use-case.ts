import { Injectable } from '@nestjs/common';
import { FichaRepository } from '../../domain/ficha.repository';
import { CreateFichaDto } from '../dto/create-ficha.dto';
import { Ficha } from '../../domain/ficha.entity';
import { handleDbErrors } from '../handle-db-errors';
import { FindOneProgramaUseCase } from 'src/programas/application/use-cases/find-one-programa.use-case';

@Injectable()
export class CreateFichaUseCase {
  constructor(
    private readonly fichaRepository: FichaRepository,
    private readonly findOnePrograma: FindOneProgramaUseCase,
  ) {}

  async execute(dto: CreateFichaDto): Promise<Ficha> {
    const programa = await this.findOnePrograma.execute(dto.programaId);

    try {
      const ficha = new Ficha({
        codigoFicha: dto.codigoFicha,
        fechaInicio: new Date(dto.fechaInicio),
        fechaFin: new Date(dto.fechaFin),
        estado: dto.estado,
        programa,
      });
      return await this.fichaRepository.create(ficha);
    } catch (error) {
      handleDbErrors(error);
    }
  }
}
