import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RoleRepository } from '../../domain/role.repository';
import { CreateRoleDto } from '../dto/create-role.dto';
import { Role } from '../../domain/role.entity';
import { handleDbErrors } from '../handle-db-errors';
import { Rol_permisoOrmEntity } from 'src/rol_permisos/infrastructure/persistence/rol_permiso.orm-entity';

@Injectable()
export class CreateRoleUseCase {
  constructor(
    private readonly roleRepository: RoleRepository,
    @InjectRepository(Rol_permisoOrmEntity)
    private readonly rolPermisoRepo: Repository<Rol_permisoOrmEntity>,
  ) {}

  async execute(dto: CreateRoleDto): Promise<Role> {
    try {
      const role = new Role({
        nombre:      dto.nombre,
        descripcion: dto.descripcion,
        nivelAcceso: dto.nivelAcceso,
        estado:      dto.estado,
      });
      const saved = await this.roleRepository.create(role);

      if (dto.permisosIds?.length) {
        const entities = dto.permisosIds.map((permisoId) =>
          this.rolPermisoRepo.create({
            role:    { id: saved.id } as any,
            permiso: { id: permisoId } as any,
          }),
        );
        await this.rolPermisoRepo.save(entities);
      }

      return saved;
    } catch (error) {
      handleDbErrors(error);
    }
  }
}
