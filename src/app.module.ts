import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DepartamentoModule } from './departamento/departamento.module';
import { MunicipioModule } from './municipio/municipio.module';
import { CentroModule } from './centro/centro.module';
import { SedeModule } from './sede/sede.module';
import { AreaModule } from './area/area.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST ?? 'localhost',
      port: Number(process.env.DB_PORT ?? 5433),
      username: process.env.DB_USERNAME ?? 'nest',
      password: process.env.DB_PASSWORD ?? 'nest',
      database: process.env.DB_DATABASE ?? 'hexagonal_db',
      autoLoadEntities: true,
      synchronize: process.env.DB_SYNCHRONIZE === 'true',
      logging: process.env.DB_LOGGING === 'true',
    }),
    DepartamentoModule,
    MunicipioModule,
    CentroModule,
    SedeModule,
    AreaModule,
  ],
})
export class AppModule {}
