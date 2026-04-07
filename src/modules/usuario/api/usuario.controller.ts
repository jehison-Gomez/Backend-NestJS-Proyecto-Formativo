import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { Usuario } from '../domain/usuario.entity';
import { UsuarioService } from '../application/usuario.service';
import { UsuarioStatus } from '../domain/usuario-status.enum';

@Controller('usuarios')
export class UsuarioController {
  constructor(private readonly usuarioService: UsuarioService) {}

  @Get()
  findAll(): Promise<Usuario[]> {
    return this.usuarioService.findAll();
  }

  @Get(':id')
  findById(@Param('id') id: string): Promise<Usuario | null> {
    return this.usuarioService.findById(Number(id));
  }

  @Post()
  create(
    @Body()
    body: {
      nombre: string;
      apellido: string;
      correo: string;
      contrasena: string;
      estado?: UsuarioStatus;
      fichaId?: number;
      rolId?: number;
      asignacionId?: number;
    },
  ): Promise<Usuario> {
    const usuario = new Usuario(
      0,
      body.nombre,
      body.apellido,
      body.correo,
      body.contrasena,
      body.estado ?? UsuarioStatus.ACTIVO,
      body.fichaId,
      body.rolId,
      body.asignacionId,
    );
    return this.usuarioService.create(usuario);
  }
}
