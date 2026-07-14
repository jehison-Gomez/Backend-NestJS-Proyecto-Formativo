import { Injectable } from '@nestjs/common';
import { RoleRepository } from '../../domain/role.repository';
import { CreateRoleDto } from '../dto/create-role.dto';
import { Role } from '../../domain/role.entity';
import { handleDbErrors } from '../handle-db-errors';

@Injectable()
export class CreateRoleUseCase {
  constructor(private readonly roleRepository: RoleRepository) {}

  async execute(dto: CreateRoleDto): Promise<Role> {
    try {
      const role = new Role({
        nombre: dto.nombre,
        descripcion: dto.descripcion,
        nivelAcceso: dto.nivelAcceso,
        estado: dto.estado,
      });
      return await this.roleRepository.create(role);
    } catch (error) {
      handleDbErrors(error);
    }
  }
}
