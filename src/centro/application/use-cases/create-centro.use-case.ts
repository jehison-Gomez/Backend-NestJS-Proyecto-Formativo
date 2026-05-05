import { Injectable } from '@nestjs/common';
import { CentroRepository } from '../../domain/centro.repository';
import { Centro } from '../../domain/centro.entity';
import { CreateCentroDto } from '../dto/create-centro.dto';
import { handleDBErrors } from '../handle-db-errors';

@Injectable()
export class CreateCentroUseCase {
  constructor(private readonly repository: CentroRepository) {}

  async execute(createCentroDto: CreateCentroDto): Promise<Centro> {
    try {
      const centro = new Centro({
        ...createCentroDto,
        estado: createCentroDto.estado ?? true,
      });
      return await this.repository.create(centro);
    } catch (error) {
      handleDBErrors(error);
    }
  }
}
