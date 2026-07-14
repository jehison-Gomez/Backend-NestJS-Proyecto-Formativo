import { Injectable, NotFoundException } from '@nestjs/common';
import { RoleRepository } from '../../domain/role.repository';
import { UpdateRoleDto } from '../dto/update-role.dto';
import { Role } from '../../domain/role.entity';
import { handleDbErrors } from '../handle-db-errors';

@Injectable()
export class UpdateRoleUseCase {
  constructor(private readonly roleRepository: RoleRepository) {}

  async execute(id: string, dto: UpdateRoleDto): Promise<Role> {
    const exists = await this.roleRepository.findOne(id);
    if (!exists) throw new NotFoundException(`Role #${id} no encontrado`);

    try {
      return await this.roleRepository.update(id, dto);
    } catch (error) {
      handleDbErrors(error);
    }
  }
}
