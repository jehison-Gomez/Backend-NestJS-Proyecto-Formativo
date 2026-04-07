import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsuarioController } from './api/usuario.controller';
import { UsuarioService } from './application/usuario.service';
import { UsuarioTypeOrmRepository } from './infrastructure/usuario.typeorm.repository';
import { UsuarioOrmEntity } from './infrastructure/typeorm/usuario.orm-entity';
import { UsuarioRepository } from './domain/usuario.repository';

@Module({
  imports: [TypeOrmModule.forFeature([UsuarioOrmEntity])],
  controllers: [UsuarioController],
  providers: [
    UsuarioService,
    {
      provide: UsuarioRepository,
      useClass: UsuarioTypeOrmRepository,
    },
  ],
})
export class UsuarioModule {}
