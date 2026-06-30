import { Injectable, NotFoundException } from '@nestjs/common';
import { SedeRepository } from '../../domain/sede.repository';
import { UpdateSedeDto } from '../dto/update-sede.dto';
import { Sede } from '../../domain/sede.entity';
import { handleDbErrors } from '../handle-db-errors';

@Injectable()
export class UpdateSedeUseCase {
  constructor(private readonly sedeRepository: SedeRepository) {}

  async execute(id: string, dto: UpdateSedeDto): Promise<Sede> {
    const exists = await this.sedeRepository.findOne(id);
    if (!exists) throw new NotFoundException(`Sede #${id} no encontrado`);

    try {
      return await this.sedeRepository.update(id, dto);
    } catch (error) {
      handleDbErrors(error);
    }
  }
}
