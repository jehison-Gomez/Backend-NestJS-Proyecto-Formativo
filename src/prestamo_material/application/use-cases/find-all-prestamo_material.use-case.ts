import { Injectable } from '@nestjs/common';
import { Prestamo_materialRepository } from '../../domain/prestamo_material.repository';
import { Prestamo_material } from '../../domain/prestamo_material.entity';

@Injectable()
export class FindAllPrestamo_materialUseCase {
  constructor(private readonly prestamo_materialRepository: Prestamo_materialRepository) {}

  async execute(): Promise<Prestamo_material[]> {
    return this.prestamo_materialRepository.findAll();
  }
}
