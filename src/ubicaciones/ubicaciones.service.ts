import { Injectable, Inject } from '@nestjs/common';
import { UBICACION_REPOSITORY } from './domain/ubicacion.repository';
import type { UbicacionRepository } from './domain/ubicacion.repository';

import { CreateUbicacionDto } from './application/dto/create-ubicacion.dto';
import { UpdateUbicacionDto } from './application/dto/update-ubicacion.dto';
import { Ubicacion } from './domain/ubicacion.entity';

@Injectable()
export class UbicacionesService {
  constructor(
    @Inject(UBICACION_REPOSITORY)
    private readonly ubicacionRepository: UbicacionRepository,
  ) {}

  async create(dto: CreateUbicacionDto): Promise<Ubicacion> {
    return this.ubicacionRepository.save(dto as any);
  }

  async findAll(): Promise<Ubicacion[]> {
    return this.ubicacionRepository.findAll();
  }

  async findOne(id: string): Promise<Ubicacion | null> {
    return this.ubicacionRepository.findById(id);
  }

  async update(id: string, dto: UpdateUbicacionDto): Promise<Ubicacion> {
    // Buscamos si existe la ubicación antes de actualizar
    const existing = await this.findOne(id);
    if (!existing) {
        throw new Error('Ubicación no encontrada');
    }
    // Combinamos los datos viejos con los nuevos
    return this.ubicacionRepository.save({ ...existing, ...dto } as any);
  }

  async remove(id: string): Promise<void> {
    return this.ubicacionRepository.delete(id);
  }
}