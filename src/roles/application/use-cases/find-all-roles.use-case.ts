import { Injectable } from '@nestjs/common';
import { RoleRepository } from '../../domain/role.repository';
import { Role } from '../../domain/role.entity';

@Injectable()
export class FindAllRolesUseCase {
  constructor(private readonly roleRepository: RoleRepository) {}

  async execute(): Promise<Role[]> {
    return this.roleRepository.findAll();
  }
}
