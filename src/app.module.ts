import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsuarioModule } from './modules/usuario/usuario.module';
import { UsuarioOrmEntity } from './modules/usuario/infrastructure/typeorm/usuario.orm-entity';
import { RolOrmEntity } from './entities/rol.orm-entity';
import { PermisoOrmEntity } from './entities/permiso.orm-entity';
import { RolPermisoOrmEntity } from './entities/rol-permiso.orm-entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST ?? 'localhost',
      port: Number(process.env.DB_PORT ?? 5432),
      username: process.env.DB_USERNAME ?? 'nest',
      password: process.env.DB_PASSWORD ?? 'nest',
      database: process.env.DB_DATABASE ?? 'hexagonal_db',
      entities: [UsuarioOrmEntity, RolOrmEntity, PermisoOrmEntity, RolPermisoOrmEntity],
      synchronize: process.env.DB_SYNCHRONIZE === 'true',
      logging: process.env.DB_LOGGING === 'true',
    }),
    UsuarioModule,
  ],
})
export class AppModule {}
