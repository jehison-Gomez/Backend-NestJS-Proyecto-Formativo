import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RoleRepository } from '../../domain/role.repository';
import { UpdateRoleDto } from '../dto/update-role.dto';
import { Role } from '../../domain/role.entity';
import { handleDbErrors } from '../handle-db-errors';
import { Rol_permisoOrmEntity } from 'src/rol_permisos/infrastructure/persistence/rol_permiso.orm-entity';

@Injectable()
export class UpdateRoleUseCase {
  constructor(
    private readonly roleRepository: RoleRepository,
    @InjectRepository(Rol_permisoOrmEntity)
    private readonly rolPermisoRepo: Repository<Rol_permisoOrmEntity>,
  ) {}

  async execute(id: string, dto: UpdateRoleDto): Promise<Role> {
    const exists = await this.roleRepository.findOne(id);
    if (!exists) throw new NotFoundException(`Role #${id} no encontrado`);

    try {
      const updated = await this.roleRepository.update(id, dto);

      if (dto.permisosIds !== undefined) {
        await this.rolPermisoRepo.delete({ role: { id } as any });
        if (dto.permisosIds.length > 0) {
          const entities = dto.permisosIds.map((permisoId) =>
            this.rolPermisoRepo.create({
              role:    { id } as any,
              permiso: { id: permisoId } as any,
            }),
          );
          await this.rolPermisoRepo.save(entities);
        }
      }

      return updated;
    } catch (error) {
      handleDbErrors(error);
    }
  }
}
