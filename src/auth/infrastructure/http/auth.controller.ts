import { Body, Controller, Get, HttpCode, HttpStatus, Post, Res } from '@nestjs/common';
import type { Response } from 'express';
import { LoginUseCase }                    from '../../application/use-cases/login.use-case';
import { SolicitarRecuperacionUseCase }    from '../../application/use-cases/solicitar-recuperacion.use-case';
import { VerificarCodigoUseCase }          from '../../application/use-cases/verificar-codigo.use-case';
import { RestablecerContrasenaUseCase }    from '../../application/use-cases/restablecer-contrasena.use-case';
import { LoginDto }                        from '../../application/dto/login.dto';
import { RecuperarContrasenaDto }          from '../../application/dto/recuperar-contrasena.dto';
import { VerificarCodigoDto }              from '../../application/dto/verificar-codigo.dto';
import { RestablecerContrasenaDto }        from '../../application/dto/restablecer-contrasena.dto';
import { Public }                          from '../decorators/public.decorator';
import { CurrentUser }                     from '../decorators/current-user.decorator';
import type { JwtPayload }                 from '../decorators/current-user.decorator';
import { FindOneUsuarioUseCase }           from 'src/usuarios/application/use-cases/find-one-usuario.use-case';
import { CalculateUserPermissionsUseCase } from 'src/usuarios/application/use-cases/calculate-user-permissions.use-case';

const COOKIE_NAME    = 'access_token';
const COOKIE_MAX_AGE = 8 * 60 * 60 * 1000;

@Controller('auth')
export class AuthController {
  constructor(
    private readonly loginUseCase:                 LoginUseCase,
    private readonly solicitarRecuperacionUseCase: SolicitarRecuperacionUseCase,
    private readonly verificarCodigoUseCase:       VerificarCodigoUseCase,
    private readonly restablecerContrasenaUseCase: RestablecerContrasenaUseCase,
    private readonly findOneUsuario:               FindOneUsuarioUseCase,
    private readonly calcularPermisos:             CalculateUserPermissionsUseCase,
  ) {}

  @Public()
  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(@Body() dto: LoginDto, @Res({ passthrough: true }) res: Response) {
    const { access_token } = await this.loginUseCase.execute(dto);
    res.cookie(COOKIE_NAME, access_token, {
      httpOnly: true,
      sameSite: 'lax',
      maxAge:   COOKIE_MAX_AGE,
      secure:   process.env.NODE_ENV === 'production',
    });
    return { message: 'Login exitoso' };
  }

  @Get('me')
  async me(@CurrentUser() user: JwtPayload) {
    const usuario  = await this.findOneUsuario.execute(user.sub);
    const permisos = await this.calcularPermisos.execute(user.sub);
    return {
      id:      usuario.id,
      nombre:  usuario.nombre,
      correo:  usuario.correo,
      rol:     usuario.role?.nombre?.toLowerCase() ?? null,
      sedeId:  usuario.sede?.id ?? null,
      permisos,
    };
  }

  @Public()
  @Post('logout')
  @HttpCode(HttpStatus.OK)
  logout(@Res({ passthrough: true }) res: Response): { message: string } {
    res.clearCookie(COOKIE_NAME);
    return { message: 'Sesion cerrada' };
  }

  @Public()
  @Post('recuperar-contrasena')
  @HttpCode(HttpStatus.OK)
  async recuperarContrasena(@Body() dto: RecuperarContrasenaDto) {
    return this.solicitarRecuperacionUseCase.execute(dto.correo);
  }

  @Public()
  @Post('verificar-codigo')
  @HttpCode(HttpStatus.OK)
  verificarCodigo(@Body() dto: VerificarCodigoDto) {
    return this.verificarCodigoUseCase.execute(dto.correo, dto.codigo);
  }

  @Public()
  @Post('restablecer-contrasena')
  @HttpCode(HttpStatus.OK)
  async restablecerContrasena(@Body() dto: RestablecerContrasenaDto) {
    return this.restablecerContrasenaUseCase.execute(dto.correo, dto.codigo, dto.nuevaContrasena);
  }
}
