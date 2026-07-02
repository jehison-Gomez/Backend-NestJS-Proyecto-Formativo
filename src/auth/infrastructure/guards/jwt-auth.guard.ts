import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { IS_PUBLIC_KEY } from '../decorators/public.decorator';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
    private readonly reflector: Reflector,
  ) {}

  canActivate(context: ExecutionContext): boolean {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (isPublic) return true;

    const request: Request = context.switchToHttp().getRequest();
    const token = this.extractToken(request);
    if (!token) throw new UnauthorizedException('Token no proporcionado');

    try {
      request['user'] = this.jwtService.verify(token);
      return true;
    } catch {
      throw new UnauthorizedException('Token inválido o expirado');
    }
  }

  private extractToken(request: Request): string | undefined {
    const cookieToken: string | undefined = request.cookies?.['access_token'];
    if (cookieToken) return cookieToken;

    const authHeader = request.headers['authorization'];
    if (authHeader?.startsWith('Bearer ')) return authHeader.split(' ')[1];

    return undefined;
  }
}
