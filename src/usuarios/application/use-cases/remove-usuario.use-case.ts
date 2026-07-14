import { Injectable, NotFoundException } from '@nestjs/common';
import { UsuarioRepository } from '../../domain/usuario.repository';

@Injectable()
export class RemoveUsuarioUseCase {
  constructor(private readonly usuarioRepository: UsuarioRepository) {}

  async execute(id: string): Promise<{ message: string }> {
    const existe = await this.usuarioRepository.findOne(id);
    if (!existe) throw new NotFoundException(`Usuario #${id} no encontrado`);

    await this.usuarioRepository.update(id, { estado: 'inactivo' } as any);
    return { message: 'Usuario desactivado correctamente' };
  }
}
