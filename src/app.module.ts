import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MaterialModulo } from './material/material.modulo';
import { TrasladoModulo } from './traslado/traslado.modulo';
import { MaterialUbicacionModulo } from './material-ubicacion/material-ubicacion.modulo';

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
    MaterialModulo,
    MaterialUbicacionModulo,
    TrasladoModulo,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}