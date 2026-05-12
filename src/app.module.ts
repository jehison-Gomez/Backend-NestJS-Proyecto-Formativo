import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ServeStaticModule } from '@nestjs/serve-static';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';
// import { FichasModule } from './fichas/fichas.module';
import { DepartamentosModule } from './departamentos/departamentos.module';
import { MunicipiosModule } from './municipios/municipios.module';
import { CentrosModule } from './centros/centros.module';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'),
    }),
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
        dropSchema: true,
      }),
    // FichasModule,
    DepartamentosModule,
    MunicipiosModule,
    CentrosModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}