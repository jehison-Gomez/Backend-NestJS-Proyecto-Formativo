import { Injectable, NotFoundException } from '@nestjs/common';
import { UsuarioRepository } from '../../domain/usuario.repository';
import { handleDbErrors } from '../handle-db-errors';

@Injectable()
export class RemoveUsuarioUseCase {
  constructor(private readonly usuarioRepository: UsuarioRepository) {}

  async execute(id: string): Promise<{ message: string }> {
    const exists = await this.usuarioRepository.findOne(id);
    if (!exists) throw new NotFoundException(`Usuario #${id} no encontrado`);

    try {
      await this.usuarioRepository.remove(id);
      return { message: `Usuario #${id} eliminado correctamente` };
    } catch (error) {
      handleDbErrors(error);
    }
  }
}
