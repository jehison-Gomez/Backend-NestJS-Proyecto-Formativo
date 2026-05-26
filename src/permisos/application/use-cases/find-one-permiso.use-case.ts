import { Injectable, NotFoundException } from '@nestjs/common';
import { PermisoRepository } from '../../domain/permiso.repository';
import { Permiso } from '../../domain/permiso.entity';

@Injectable()
export class FindOnePermisoUseCase {
  constructor(private readonly permisoRepository: PermisoRepository) {}

  async execute(id: string): Promise<Permiso> {
    const permiso = await this.permisoRepository.findOne(id);
    if (!permiso) throw new NotFoundException(`Permiso #${id} no encontrado`);
    return permiso;
  }
}
