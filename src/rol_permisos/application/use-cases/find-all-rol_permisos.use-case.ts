import { Injectable } from '@nestjs/common';
import { Rol_permisoRepository } from '../../domain/rol_permiso.repository';
import { Rol_permiso } from '../../domain/rol_permiso.entity';

@Injectable()
export class FindAllRol_permisosUseCase {
  constructor(private readonly rol_permisoRepository: Rol_permisoRepository) {}

  async execute(): Promise<Rol_permiso[]> {
    return this.rol_permisoRepository.findAll();
  }
}
