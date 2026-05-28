import { Injectable } from '@nestjs/common';
import { AprobacioneRepository } from '../../domain/aprobacione.repository';
import { Aprobacione } from '../../domain/aprobacione.entity';

@Injectable()
export class FindAllAprobacionesUseCase {
  constructor(private readonly aprobacioneRepository: AprobacioneRepository) {}

  async execute(): Promise<Aprobacione[]> {
    return this.aprobacioneRepository.findAll();
  }
}
