import { Injectable, NotFoundException } from '@nestjs/common';
import { PermisoRepository } from '../../domain/permiso.repository';
import { UpdatePermisoDto } from '../dto/update-permiso.dto';
import { Permiso } from '../../domain/permiso.entity';
import { handleDbErrors } from '../handle-db-errors';

@Injectable()
export class UpdatePermisoUseCase {
  constructor(private readonly permisoRepository: PermisoRepository) {}

  async execute(id: string, dto: UpdatePermisoDto): Promise<Permiso> {
    const exists = await this.permisoRepository.findOne(id);
    if (!exists) throw new NotFoundException(`Permiso #${id} no encontrado`);

    try {
      return await this.permisoRepository.update(id, dto);
    } catch (error) {
      handleDbErrors(error);
    }
  }
}
