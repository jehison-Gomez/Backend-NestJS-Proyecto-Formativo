import { Injectable } from '@nestjs/common';
import { FichaRepository } from '../../domain/ficha.repository';
import { CreateFichaDto } from '../dto/create-ficha.dto';
import { Ficha } from '../../domain/ficha.entity';
import { handleDbErrors } from '../handle-db-errors';

@Injectable()
export class CreateFichaUseCase {
  constructor(private readonly fichaRepository: FichaRepository) {}

  async execute(dto: CreateFichaDto): Promise<Ficha> {
    try {
      const ficha = new Ficha({ ...dto });
      return await this.fichaRepository.create(ficha);
    } catch (error) {
      handleDbErrors(error);
    }
  }
}
