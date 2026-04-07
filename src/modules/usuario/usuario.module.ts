import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsuarioOrmEntity } from '../../infrastructure/typeorm/usuario.orm-entity';
import { UsuarioRepositoryAdapter } from '../../infrastructure/typeorm/usuario.repository.adapter';
import { UsuarioRepository } from '../../domain/repositories/usuario.repository';

@Module({
  imports: [TypeOrmModule.forFeature([UsuarioOrmEntity])],
  providers: [
    {
      provide: 'UsuarioRepository',
      useClass: UsuarioRepositoryAdapter,
    },
  ],
  exports: ['UsuarioRepository'],
})
export class UsuarioModule {}
