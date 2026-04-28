import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config'; // Importamos ConfigService
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
    // 1. Configuración de archivos estáticos
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'),
    }),

    // 2. Cargar variables de entorno globalmente
    ConfigModule.forRoot({
      isGlobal: true,
    }),

    // 3. Conexión asíncrona a la base de datos
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.get<string>('DB_HOST'),
        port: configService.get<number>('DB_PORT', 3306),
        username: configService.get<string>('DB_USERNAME'),
        password: configService.get<string>('DB_PASSWORD'),
        database: configService.get<string>('DB_NAME'),
        autoLoadEntities: true,
        synchronize: true, // Recomendado solo en desarrollo
        dropSchema: false, // ¡Cuidado! Cambiado a false para no borrar tus datos cada vez
      }),
    }),

    // 4. Tus módulos de negocio
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
