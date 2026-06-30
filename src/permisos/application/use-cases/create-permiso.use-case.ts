import { Injectable } from '@nestjs/common';
import { PermisoRepository } from '../../domain/permiso.repository';
import { CreatePermisoDto } from '../dto/create-permiso.dto';
import { Permiso } from '../../domain/permiso.entity';
import { handleDbErrors } from '../handle-db-errors';

@Injectable()
export class CreatePermisoUseCase {
  constructor(private readonly permisoRepository: PermisoRepository) {}

  async execute(dto: CreatePermisoDto): Promise<Permiso> {
    try {
      const permiso = new Permiso({
        nombre: dto.nombre,
        descripcion: dto.descripcion,
        modulo: dto.modulo,
        accion: dto.accion,
        estado: dto.estado,
      });
      return await this.permisoRepository.create(permiso);
    } catch (error) {
      handleDbErrors(error);
    }
  }
}
