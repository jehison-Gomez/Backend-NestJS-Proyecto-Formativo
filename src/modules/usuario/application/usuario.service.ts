import { Inject, Injectable } from '@nestjs/common';
import { Usuario } from '../domain/usuario.entity';
import { UsuarioRepository } from '../domain/usuario.repository';

@Injectable()
export class UsuarioService {
  constructor(
    @Inject(UsuarioRepository)
    private readonly usuarioRepository: UsuarioRepository,
  ) {}

  findAll(): Promise<Usuario[]> {
    return this.usuarioRepository.findAll();
  }

  findById(id: number): Promise<Usuario | null> {
    return this.usuarioRepository.findById(id);
  }

  create(usuario: Usuario): Promise<Usuario> {
    return this.usuarioRepository.create(usuario);
  }
}
