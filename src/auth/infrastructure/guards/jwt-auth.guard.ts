import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}

  canActivate(context: ExecutionContext): boolean {
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
    // 1. Primero busca en la cookie HttpOnly
    const cookieToken: string | undefined = request.cookies?.['access_token'];
    if (cookieToken) return cookieToken;

    // 2. Fallback: Authorization header (para Postman / herramientas externas)
    const authHeader = request.headers['authorization'];
    if (authHeader?.startsWith('Bearer ')) return authHeader.split(' ')[1];

    return undefined;
  }
}
