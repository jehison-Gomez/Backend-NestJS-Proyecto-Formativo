import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { UsuariosModule }                   from 'src/usuarios/usuarios.module';
import { MailModule }                        from 'src/mail/mail.module';

import { LoginUseCase }                     from './application/use-cases/login.use-case';
import { SolicitarRecuperacionUseCase }     from './application/use-cases/solicitar-recuperacion.use-case';
import { VerificarCodigoUseCase }           from './application/use-cases/verificar-codigo.use-case';
import { RestablecerContrasenaUseCase }     from './application/use-cases/restablecer-contrasena.use-case';
import { ResetCodeStore }                   from './application/reset-code.store';
import { AuthController }                   from './infrastructure/http/auth.controller';
import { JwtAuthGuard }                     from './infrastructure/guards/jwt-auth.guard';

@Module({
  imports: [
    UsuariosModule,
    MailModule,
    JwtModule.registerAsync({
      imports:    [ConfigModule],
      inject:     [ConfigService],
      useFactory: (config: ConfigService) => ({
        secret:      config.get<string>('JWT_SECRET'),
        signOptions: { expiresIn: '8h' },
      }),
    }),
  ],
  controllers: [AuthController],
  providers: [
    LoginUseCase,
    SolicitarRecuperacionUseCase,
    VerificarCodigoUseCase,
    RestablecerContrasenaUseCase,
    ResetCodeStore,
    JwtAuthGuard,
  ],
  exports: [JwtAuthGuard, JwtModule],
})
export class AuthModule {}
