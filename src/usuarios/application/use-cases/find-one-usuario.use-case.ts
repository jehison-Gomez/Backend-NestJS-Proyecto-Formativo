import { Injectable, NotFoundException } from '@nestjs/common';
import { UsuarioRepository } from '../../domain/usuario.repository';
import { Usuario } from '../../domain/usuario.entity';

@Injectable()
export class FindOneUsuarioUseCase {
  constructor(private readonly usuarioRepository: UsuarioRepository) {}

  async execute(id: string): Promise<Usuario> {
    const usuario = await this.usuarioRepository.findOne(id);
    if (!usuario) throw new NotFoundException(`Usuario #${id} no encontrado`);
    return usuario;
  }
}
