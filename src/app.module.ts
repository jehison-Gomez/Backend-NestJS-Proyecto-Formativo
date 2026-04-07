import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ServeStaticModule } from '@nestjs/serve-static';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';
import { RegionsModule } from './regions/regions.module';
import { DepartmentsModule } from './departments/departments.module';
import { CentersModule } from './centers/centers.module';
import { SitesModule } from './sites/sites.module';
import { AreasModule } from './areas/areas.module';
import { ProgramsModule } from './programs/programs.module';
import { SpacesModule } from './spaces/spaces.module';

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
    RegionsModule,
    DepartmentsModule,
    CentersModule,
    SitesModule,
    AreasModule,
    ProgramsModule,
    SpacesModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
