import { Injectable, NotFoundException } from '@nestjs/common';
import { Prestamo_materialRepository } from '../../domain/prestamo_material.repository';
import { Prestamo_material } from '../../domain/prestamo_material.entity';

@Injectable()
export class FindOnePrestamo_materialUseCase {
  constructor(private readonly prestamo_materialRepository: Prestamo_materialRepository) {}

  async execute(id: string): Promise<Prestamo_material> {
    const prestamo_material = await this.prestamo_materialRepository.findOne(id);
    if (!prestamo_material) throw new NotFoundException(`Prestamo_material #${id} no encontrado`);
    return prestamo_material;
  }
}
