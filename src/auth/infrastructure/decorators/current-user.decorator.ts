import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export interface JwtPayload {
  sub:    string;
  correo: string;
  nombre: string;
  rol:    string;
  sedeId: string | null;
}

export const CurrentUser = createParamDecorator(
  (_data: unknown, ctx: ExecutionContext): JwtPayload => {
    const request = ctx.switchToHttp().getRequest();
    return request.user;
  },
);
