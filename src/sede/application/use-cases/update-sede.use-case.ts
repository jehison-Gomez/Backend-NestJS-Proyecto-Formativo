import { Injectable } from '@nestjs/common';
import { SedeRepository } from '../../domain/sede.repository';
import { Sede } from '../../domain/sede.entity';
import { UpdateSedeDto } from '../dto/update-sede.dto';
import { handleDBErrors } from '../handle-db-errors';

@Injectable()
export class UpdateSedeUseCase {
  constructor(private readonly repository: SedeRepository) {}

  async execute(id: number, updateSedeDto: UpdateSedeDto): Promise<Sede> {
    try {
      return await this.repository.update(id, updateSedeDto);
    } catch (error) {
      handleDBErrors(error);
    }
  }
}
