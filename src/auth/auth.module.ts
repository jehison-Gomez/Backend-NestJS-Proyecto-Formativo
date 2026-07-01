import { forwardRef, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { UsuariosModule } from 'src/usuarios/usuarios.module';

import { LoginUseCase }    from './application/use-cases/login.use-case';
import { AuthController }  from './infrastructure/http/auth.controller';
import { JwtAuthGuard }    from './infrastructure/guards/jwt-auth.guard';

@Module({
  imports: [
    forwardRef(() => UsuariosModule),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject:  [ConfigService],
      useFactory: (config: ConfigService) => ({
        secret:      config.get<string>('JWT_SECRET'),
        signOptions: { expiresIn: '8h' },
      }),
    }),
  ],
  controllers: [AuthController],
  providers:   [LoginUseCase, JwtAuthGuard],
  exports:     [JwtAuthGuard, JwtModule],
})
export class AuthModule {}
