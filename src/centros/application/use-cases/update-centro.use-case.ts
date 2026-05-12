import { Injectable, NotFoundException } from '@nestjs/common';
import { CentroRepository } from '../../domain/centro.repository';
import { UpdateCentroDto } from '../dto/update-centro.dto';
import { Centro } from '../../domain/centro.entity';
import { handleDbErrors } from '../handle-db-errors';

@Injectable()
export class UpdateCentroUseCase {
  constructor(private readonly centroRepository: CentroRepository) {}

  async execute(id: string, dto: UpdateCentroDto): Promise<Centro> {
    const exists = await this.centroRepository.findOne(id);
    if (!exists) throw new NotFoundException(`Centro #${id} no encontrado`);

    try {
      return await this.centroRepository.update(id, dto);
    } catch (error) {
      handleDbErrors(error);
    }
  }
}
