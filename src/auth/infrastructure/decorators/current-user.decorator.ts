import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export type JwtPayload = {
  sub: string;
  correo: string;
  nombre: string;
  rol: string;
  sedeId: string | null;
  centroId: string | null;
};

export const CurrentUser = createParamDecorator(
  (_data: unknown, ctx: ExecutionContext): JwtPayload => {
    const request = ctx.switchToHttp().getRequest();
    return request.user as JwtPayload;
  },
);
