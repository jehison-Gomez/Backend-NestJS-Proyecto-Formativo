import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { NotificacionOrmEntity }             from './infrastructure/persistence/notificacion.orm-entity';
import { TypeOrmNotificacionRepository }     from './infrastructure/persistence/typeorm-notificacion.repository';
import { NotificacionesController }          from './infrastructure/http/notificaciones.controller';
import { NotificacionRepository }            from './domain/notificacion.repository';

import { CreateNotificacionUseCase }         from './application/use-cases/create-notificacion.use-case';
import { FindByDestinatarioUseCase }         from './application/use-cases/find-by-destinatario.use-case';
import { MarcarLeidaUseCase }                from './application/use-cases/marcar-leida.use-case';
import { MarcarTodasLeidasUseCase }          from './application/use-cases/marcar-todas-leidas.use-case';

import { AuthModule }                        from 'src/auth/auth.module';

const USE_CASES = [
  CreateNotificacionUseCase,
  FindByDestinatarioUseCase,
  MarcarLeidaUseCase,
  MarcarTodasLeidasUseCase,
];

@Module({
  imports: [
    TypeOrmModule.forFeature([NotificacionOrmEntity]),
    AuthModule,
  ],
  controllers: [NotificacionesController],
  providers: [
    ...USE_CASES,
    { provide: NotificacionRepository, useClass: TypeOrmNotificacionRepository },
  ],
  exports: [...USE_CASES],
})
export class NotificacionesModule {}
