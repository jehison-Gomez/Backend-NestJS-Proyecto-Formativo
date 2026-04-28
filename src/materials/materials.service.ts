import { Injectable, Inject } from '@nestjs/common';
// Importamos el Token como valor y la Interfaz como tipo
import { MATERIAL_REPOSITORY } from './domain/material.repository';
import type { MaterialRepository } from './domain/material.repository';
import { CreateMaterialDto } from './application/dto/create-material.dto';
import { UpdateMaterialDto } from './application/dto/update-material.dto';
import { Material } from './domain/material.entity';

@Injectable()
export class MaterialsService {
  constructor(
    // El decorador @Inject usa el Token (valor) para encontrar la implementación
    @Inject(MATERIAL_REPOSITORY)
    private readonly materialRepository: MaterialRepository,
  ) {}

  async create(dto: CreateMaterialDto): Promise<Material> {
    const material = new Material();
    Object.assign(material, dto);
    return this.materialRepository.save(material);
  }

  async findAll(): Promise<Material[]> {
    return this.materialRepository.findAll();
  }

  async findOne(id: string): Promise<Material | null> {
    const numericId = Number(id);
    return this.materialRepository.findById(numericId);
  }

  async update(id: string, dto: UpdateMaterialDto): Promise<Material> {
    const numericId = Number(id);
    const existing = await this.materialRepository.findById(numericId);
    if (!existing) {
      throw new Error(`Material with id ${id} not found`);
    }
    Object.assign(existing, dto);
    return this.materialRepository.save(existing);
  }

  async remove(id: string): Promise<void> {
    const numericId = Number(id);
    return this.materialRepository.delete(numericId);
  }
}
