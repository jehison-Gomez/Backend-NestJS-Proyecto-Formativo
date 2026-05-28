import { Injectable } from '@nestjs/common';
import { DevolucioneRepository } from '../../domain/devolucione.repository';
import { Devolucione } from '../../domain/devolucione.entity';

@Injectable()
export class FindAllDevolucionesUseCase {
  constructor(private readonly devolucioneRepository: DevolucioneRepository) {}

  async execute(): Promise<Devolucione[]> {
    return this.devolucioneRepository.findAll();
  }
}
