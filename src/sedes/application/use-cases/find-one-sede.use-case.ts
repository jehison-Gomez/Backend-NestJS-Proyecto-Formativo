import { Injectable, NotFoundException } from '@nestjs/common';
import { SedeRepository } from '../../domain/sede.repository';
import { Sede } from '../../domain/sede.entity';

@Injectable()
export class FindOneSedeUseCase {
  constructor(private readonly sedeRepository: SedeRepository) {}

  async execute(id: string): Promise<Sede> {
    const sede = await this.sedeRepository.findOne(id);
    if (!sede) throw new NotFoundException(`Sede #${id} no encontrado`);
    return sede;
  }
}
