import { Injectable, NotFoundException } from '@nestjs/common';
import { DevolucioneRepository } from '../../domain/devolucione.repository';
import { Devolucione } from '../../domain/devolucione.entity';

@Injectable()
export class FindOneDevolucioneUseCase {
  constructor(private readonly devolucioneRepository: DevolucioneRepository) {}

  async execute(id: string): Promise<Devolucione> {
    const devolucione = await this.devolucioneRepository.findOne(id);
    if (!devolucione) throw new NotFoundException(`Devolucione #${id} no encontrado`);
    return devolucione;
  }
}
