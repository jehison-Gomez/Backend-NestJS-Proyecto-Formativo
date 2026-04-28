import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PrestamoModulo } from './prestamo/prestamo.modulo.js';
import { AprobacionModulo } from './aprobacion/aprobacion.modulo.js';
import { DevolucionModulo } from './devolucion/devolucion.modulo.js';
import { NovedadModulo } from './novedad/novedad.modulo.js';
import { PrestamoMaterialModulo } from './prestamo-material/prestamo-material.modulo.js';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT ?? '5433'),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      autoLoadEntities: true,
      synchronize: true,
    }),
    PrestamoModulo,
    AprobacionModulo,
    DevolucionModulo,
    NovedadModulo,
    PrestamoMaterialModulo,
  ],
})
export class AppModule {}