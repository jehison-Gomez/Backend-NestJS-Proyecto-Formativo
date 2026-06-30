import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NotificacionOrmEntity } from './notificacion.orm-entity';
import { NotificacionesService } from './notificaciones.service';
import { NotificacionesController } from './notificaciones.controller';
import { UsuarioOrmEntity } from 'src/usuarios/infrastructure/persistence/usuario.orm-entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([NotificacionOrmEntity, UsuarioOrmEntity]),
  ],
  controllers: [NotificacionesController],
  providers:   [NotificacionesService],
  exports:     [NotificacionesService],
})
export class NotificacionesModule {}
