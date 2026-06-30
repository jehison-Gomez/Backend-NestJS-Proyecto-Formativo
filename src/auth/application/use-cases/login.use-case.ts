import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { UsuarioRepository } from 'src/usuarios/domain/usuario.repository';
import { LoginDto } from '../dto/login.dto';

@Injectable()
export class LoginUseCase {
  constructor(
    private readonly usuarioRepository: UsuarioRepository,
    private readonly jwtService: JwtService,
  ) {}

  async execute(dto: LoginDto): Promise<{ access_token: string }> {
    const usuario = await this.usuarioRepository.findByCorreo(dto.correo);
    if (!usuario) throw new UnauthorizedException('Credenciales incorrectas');

    const passwordValida = await bcrypt.compare(dto.contrasena, usuario.contrasena);
    if (!passwordValida) throw new UnauthorizedException('Credenciales incorrectas');

    if (usuario.estado === 'inactivo')
      throw new UnauthorizedException('Usuario desactivado');

    const payload = {
      sub:    usuario.id,
      correo: usuario.correo,
      nombre: usuario.nombre,
      rol:    usuario.role?.nombre,
      sedeId: usuario.sede?.id ?? null,
    };

    return { access_token: this.jwtService.sign(payload) };
  }
}
