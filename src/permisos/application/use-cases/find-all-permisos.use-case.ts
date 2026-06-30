import { Injectable } from '@nestjs/common';
import { PermisoRepository } from '../../domain/permiso.repository';
import { Permiso } from '../../domain/permiso.entity';

@Injectable()
export class FindAllPermisosUseCase {
  constructor(private readonly permisoRepository: PermisoRepository) {}

  async execute(): Promise<Permiso[]> {
    return this.permisoRepository.findAll();
  }
}
