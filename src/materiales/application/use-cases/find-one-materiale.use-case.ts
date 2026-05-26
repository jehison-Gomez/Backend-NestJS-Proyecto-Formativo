import { Injectable, NotFoundException } from '@nestjs/common';
import { MaterialeRepository } from '../../domain/materiale.repository';
import { Materiale } from '../../domain/materiale.entity';

@Injectable()
export class FindOneMaterialeUseCase {
  constructor(private readonly materialeRepository: MaterialeRepository) {}

  async execute(id: string): Promise<Materiale> {
    const materiale = await this.materialeRepository.findOne(id);
    if (!materiale) throw new NotFoundException(`Materiale #${id} no encontrado`);
    return materiale;
  }
}
