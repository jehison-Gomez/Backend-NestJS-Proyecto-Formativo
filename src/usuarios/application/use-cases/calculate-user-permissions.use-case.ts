import { Injectable, NotFoundException } from '@nestjs/common';
import { UsuarioRepository } from '../../domain/usuario.repository';

@Injectable()
export class CalculateUserPermissionsUseCase {
  constructor(private readonly usuarioRepository: UsuarioRepository) {}

  async execute(usuarioId: string): Promise<{ role: string | null; permisos: string[] }> {
    const usuario = await this.usuarioRepository.findOne(usuarioId);
    if (!usuario) throw new NotFoundException('Usuario no encontrado');

    return {
      role:     usuario.role?.nombre ?? null,
      permisos: [],
    };
  }
}
