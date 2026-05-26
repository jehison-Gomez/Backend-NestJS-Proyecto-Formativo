import { Injectable, NotFoundException } from '@nestjs/common';
import { Rol_permisoRepository } from '../../domain/rol_permiso.repository';
import { Rol_permiso } from '../../domain/rol_permiso.entity';

@Injectable()
export class FindOneRol_permisoUseCase {
  constructor(private readonly rol_permisoRepository: Rol_permisoRepository) {}

  async execute(id: string): Promise<Rol_permiso> {
    const rol_permiso = await this.rol_permisoRepository.findOne(id);
    if (!rol_permiso) throw new NotFoundException(`Rol_permiso #${id} no encontrado`);
    return rol_permiso;
  }
}
