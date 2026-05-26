import { Injectable } from '@nestjs/common';
import { UsuarioRepository } from '../../domain/usuario.repository';
import { Usuario } from '../../domain/usuario.entity';

@Injectable()
export class FindAllUsuariosUseCase {
  constructor(private readonly usuarioRepository: UsuarioRepository) {}

  async execute(): Promise<Usuario[]> {
    return this.usuarioRepository.findAll();
  }
}
