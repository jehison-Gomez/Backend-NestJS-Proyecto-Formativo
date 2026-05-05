import { Injectable } from '@nestjs/common';
import { SedeRepository } from '../../domain/sede.repository';
import { Sede } from '../../domain/sede.entity';
import { CreateSedeDto } from '../dto/create-sede.dto';
import { handleDBErrors } from '../handle-db-errors';

@Injectable()
export class CreateSedeUseCase {
  constructor(private readonly repository: SedeRepository) {}

  async execute(createSedeDto: CreateSedeDto): Promise<Sede> {
    try {
      const sede = new Sede({
        ...createSedeDto,
        estado: createSedeDto.estado ?? true,
      });
      return await this.repository.create(sede);
    } catch (error) {
      handleDBErrors(error);
    }
  }
}
