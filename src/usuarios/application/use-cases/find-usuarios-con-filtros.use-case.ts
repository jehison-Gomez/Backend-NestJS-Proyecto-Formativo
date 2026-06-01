import { Injectable } from '@nestjs/common';
import { UsuarioRepository, UsuariosPaginados } from '../../domain/usuario.repository';
import { GetUsuariosDto } from '../dto/get-usuarios.dto';

@Injectable()
export class FindUsuariosConFiltrosUseCase {
  constructor(private readonly usuarioRepository: UsuarioRepository) {}

  async execute(dto: GetUsuariosDto): Promise<UsuariosPaginados> {
    return this.usuarioRepository.findWithFilters({
      search: dto.search,
      rolId:  dto.rolId,
      estado: dto.estado,
      page:   dto.page  ?? 1,
      limit:  dto.limit ?? 10,
    });
  }
}
