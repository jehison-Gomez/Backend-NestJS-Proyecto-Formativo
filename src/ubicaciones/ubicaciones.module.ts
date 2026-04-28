import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UbicacionesService } from './ubicaciones.service';
import { UbicacionesController } from './infrastructure/http/ubicaciones.controller';
import { UbicacionOrmEntity } from './infrastructure/persistence/ubicacion.orm-entity';
import { TypeOrmUbicacionRepository } from './infrastructure/persistence/typeorm-ubicacion.repository';
import { UBICACION_REPOSITORY } from './domain/ubicacion.repository';

@Module({
  imports: [TypeOrmModule.forFeature([UbicacionOrmEntity])],
  controllers: [UbicacionesController],
  providers: [
    UbicacionesService,
    {
      provide: UBICACION_REPOSITORY,
      useClass: TypeOrmUbicacionRepository,
    },
  ],
  exports: [UBICACION_REPOSITORY],
})
export class UbicacionesModule {}
