import { Injectable, NotFoundException } from '@nestjs/common';
import { AprobacioneRepository } from '../../domain/aprobacione.repository';
import { Aprobacione } from '../../domain/aprobacione.entity';

@Injectable()
export class FindOneAprobacioneUseCase {
  constructor(private readonly aprobacioneRepository: AprobacioneRepository) {}

  async execute(id: string): Promise<Aprobacione> {
    const aprobacione = await this.aprobacioneRepository.findOne(id);
    if (!aprobacione) throw new NotFoundException(`Aprobacione #${id} no encontrado`);
    return aprobacione;
  }
}
