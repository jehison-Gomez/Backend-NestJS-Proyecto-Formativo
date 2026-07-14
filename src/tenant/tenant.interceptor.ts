import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { Observable } from 'rxjs';
import { TenantContext } from './tenant.context';
import { JwtPayload } from 'src/auth/infrastructure/decorators/current-user.decorator';

@Injectable()
export class TenantInterceptor implements NestInterceptor {
  constructor(private readonly tenant: TenantContext) {}

  intercept(ctx: ExecutionContext, next: CallHandler): Observable<any> {
    const request = ctx.switchToHttp().getRequest<{ user?: JwtPayload }>();
    const centroId = request.user?.centroId ?? null;

    return new Observable((observer) => {
      this.tenant.run(centroId, () => {
        next.handle().subscribe({
          next:     (v) => observer.next(v),
          error:    (e) => observer.error(e),
          complete: ()  => observer.complete(),
        });
      });
    });
  }
}
