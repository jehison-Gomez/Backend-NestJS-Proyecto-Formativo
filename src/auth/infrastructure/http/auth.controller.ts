import { Body, Controller, Get, HttpCode, HttpStatus, Post, Res, UseGuards } from '@nestjs/common';
import type { Response } from 'express';
import { LoginUseCase } from '../../application/use-cases/login.use-case';
import { LoginDto } from '../../application/dto/login.dto';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import { CurrentUser } from '../decorators/current-user.decorator';
import type { JwtPayload } from '../decorators/current-user.decorator';

const COOKIE_NAME = 'access_token';
const COOKIE_MAX_AGE = 8 * 60 * 60 * 1000; // 8 horas en ms

@Controller('auth')
export class AuthController {
  constructor(private readonly loginUseCase: LoginUseCase) {}

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
  @UseGuards(JwtAuthGuard)
  me(@CurrentUser() user: JwtPayload) {
    return {
      id:       user.sub,
      nombre:   user.nombre,
      correo:   user.correo,
      rol:      user.rol,
      sedeId:   user.sedeId ?? null,
      permisos: [],
    };
  }

  @Post('logout')
  @HttpCode(HttpStatus.OK)
  logout(@Res({ passthrough: true }) res: Response): { message: string } {
    res.clearCookie(COOKIE_NAME);
    return { message: 'Sesion cerrada' };
  }
}
