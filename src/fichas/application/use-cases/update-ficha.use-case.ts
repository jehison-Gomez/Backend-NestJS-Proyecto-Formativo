import { Injectable, NotFoundException } from '@nestjs/common';
import { FichaRepository } from '../../domain/ficha.repository';
import { UpdateFichaDto } from '../dto/update-ficha.dto';
import { Ficha } from '../../domain/ficha.entity';
import { handleDbErrors } from '../handle-db-errors';

@Injectable()
export class UpdateFichaUseCase {
  constructor(private readonly fichaRepository: FichaRepository) {}

  async execute(id: string, dto: UpdateFichaDto): Promise<Ficha> {
    const exists = await this.fichaRepository.findOne(id);
    if (!exists) throw new NotFoundException(`Ficha #${id} no encontrado`);

    try {
      return await this.fichaRepository.update(id, dto);
    } catch (error) {
      handleDbErrors(error);
    }
  }
}
