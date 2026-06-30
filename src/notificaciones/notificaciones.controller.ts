import { Controller, Get, Patch, Param, Query } from '@nestjs/common';
import { NotificacionesService } from './notificaciones.service';

@Controller('notificaciones')
export class NotificacionesController {
  constructor(private readonly service: NotificacionesService) {}

  @Get()
  getMis(@Query('destinatarioId') destinatarioId: string) {
    if (!destinatarioId) return [];
    return this.service.getMisNotificaciones(destinatarioId);
  }

  // IMPORTANTE: va ANTES de /:id para que 'leer-todas' no sea interpretado como UUID
  @Patch('leer-todas')
  marcarTodasLeidas(@Query('destinatarioId') destinatarioId: string) {
    if (!destinatarioId) return;
    return this.service.marcarTodasLeidas(destinatarioId);
  }

  @Patch(':id/leer')
  marcarLeida(@Param('id') id: string) {
    return this.service.marcarLeida(id);
  }
}
