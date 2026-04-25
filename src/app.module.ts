import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DepartamentoOrmEntity } from './infrastructure/typeorm/departamento.orm-entity';
import { MunicipioOrmEntity } from './infrastructure/typeorm/municipio.orm-entity';
import { CentroOrmEntity } from './infrastructure/typeorm/centro.orm-entity';
import { SedeOrmEntity } from './infrastructure/typeorm/sede.orm-entity';
import { AreaOrmEntity } from './infrastructure/typeorm/area.orm-entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST ?? 'localhost',
      port: Number(process.env.DB_PORT ?? 5433),
      username: process.env.DB_USERNAME ?? 'nest',
      password: process.env.DB_PASSWORD ?? 'nest',
      database: process.env.DB_DATABASE ?? 'hexagonal_db',
      entities: [
        DepartamentoOrmEntity,
        MunicipioOrmEntity,
        CentroOrmEntity,
        SedeOrmEntity,
        AreaOrmEntity,
      ],
      synchronize: process.env.DB_SYNCHRONIZE === 'true',
      logging: process.env.DB_LOGGING === 'true',
    }),
  ],
})
export class AppModule {}
