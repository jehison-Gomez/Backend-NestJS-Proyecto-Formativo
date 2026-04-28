import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ServeStaticModule } from '@nestjs/serve-static';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';
import { FichasModule } from './fichas/fichas.module';
import { PermisosModule } from './permisos/permisos.module';
import { ProgramasModule } from './programas/programas.module';
import { RolModule } from './rol/rol.module';
import { RolPermisosModule } from './rol_permisos/rol_permisos.module';
import { UsuariosModule } from './usuarios/usuarios.module';

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
    FichasModule,
    PermisosModule,
    ProgramasModule,
    RolModule,
    RolPermisosModule,
    UsuariosModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}