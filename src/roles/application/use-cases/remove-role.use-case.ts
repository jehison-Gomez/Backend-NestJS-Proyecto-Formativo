import { Injectable, NotFoundException } from '@nestjs/common';
import { RoleRepository } from '../../domain/role.repository';
import { handleDbErrors } from '../handle-db-errors';

@Injectable()
export class RemoveRoleUseCase {
  constructor(private readonly roleRepository: RoleRepository) {}

  async execute(id: string): Promise<{ message: string }> {
    const exists = await this.roleRepository.findOne(id);
    if (!exists) throw new NotFoundException(`Role #${id} no encontrado`);

    try {
      await this.roleRepository.remove(id);
      return { message: `Role #${id} eliminado correctamente` };
    } catch (error) {
      handleDbErrors(error);
    }
  }
}
