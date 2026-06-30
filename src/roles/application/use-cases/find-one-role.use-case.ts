import { Injectable, NotFoundException } from '@nestjs/common';
import { RoleRepository } from '../../domain/role.repository';
import { Role } from '../../domain/role.entity';

@Injectable()
export class FindOneRoleUseCase {
  constructor(private readonly roleRepository: RoleRepository) {}

  async execute(id: string): Promise<Role> {
    const role = await this.roleRepository.findOne(id);
    if (!role) throw new NotFoundException(`Role #${id} no encontrado`);
    return role;
  }
}
