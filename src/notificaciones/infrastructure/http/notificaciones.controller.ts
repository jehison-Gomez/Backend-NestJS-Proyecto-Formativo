import { Controller, Get, Patch, Param, Query, ParseUUIDPipe, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/infrastructure/guards/jwt-auth.guard';
import { FindByDestinatarioUseCase } from '../../application/use-cases/find-by-destinatario.use-case';
import { MarcarLeidaUseCase }        from '../../application/use-cases/marcar-leida.use-case';
import { MarcarTodasLeidasUseCase }  from '../../application/use-cases/marcar-todas-leidas.use-case';

@UseGuards(JwtAuthGuard)
@Controller('notificaciones')
export class NotificacionesController {
  constructor(
    private readonly findByDestinatario: FindByDestinatarioUseCase,
    private readonly marcarLeida:        MarcarLeidaUseCase,
    private readonly marcarTodasLeidas:  MarcarTodasLeidasUseCase,
  ) {}

  @Get()
  findMis(@Query('destinatarioId', ParseUUIDPipe) destinatarioId: string) {
    return this.findByDestinatario.execute(destinatarioId);
  }

  @Patch(':id/leer')
  marcarUna(@Param('id', ParseUUIDPipe) id: string) {
    return this.marcarLeida.execute(id);
  }

  @Patch('leer-todas')
  marcarTodas(@Query('destinatarioId', ParseUUIDPipe) destinatarioId: string) {
    return this.marcarTodasLeidas.execute(destinatarioId);
  }
}
