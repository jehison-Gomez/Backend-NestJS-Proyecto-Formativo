import { Body, Controller, HttpCode, HttpStatus, Post, Res } from '@nestjs/common';
import type { Response } from 'express';
import { LoginUseCase } from '../../application/use-cases/login.use-case';
import { LoginDto } from '../../application/dto/login.dto';

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

  @Post('logout')
  @HttpCode(HttpStatus.OK)
  logout(@Res({ passthrough: true }) res: Response): { message: string } {
    res.clearCookie(COOKIE_NAME);
    return { message: 'Sesion cerrada' };
  }
}
