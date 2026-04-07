import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsuarioOrmEntity } from './infrastructure/typeorm/usuario.orm-entity';

@Module({
  imports: [TypeOrmModule.forFeature([UsuarioOrmEntity])],
})
export class UsuarioModule {}
