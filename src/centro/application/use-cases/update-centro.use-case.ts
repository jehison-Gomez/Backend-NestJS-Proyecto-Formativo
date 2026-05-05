import { Injectable } from '@nestjs/common';
import { CentroRepository } from '../../domain/centro.repository';
import { Centro } from '../../domain/centro.entity';
import { UpdateCentroDto } from '../dto/update-centro.dto';
import { handleDBErrors } from '../handle-db-errors';

@Injectable()
export class UpdateCentroUseCase {
  constructor(private readonly repository: CentroRepository) {}

  async execute(id: number, updateCentroDto: UpdateCentroDto): Promise<Centro> {
    try {
      return await this.repository.update(id, updateCentroDto);
    } catch (error) {
      handleDBErrors(error);
    }
  }
}
