import { Injectable, Logger } from '@nestjs/common';
import { UsuarioRepository } from 'src/usuarios/domain/usuario.repository';
import { MailService } from 'src/mail/mail.service';
import { ResetCodeStore } from '../reset-code.store';

@Injectable()
export class SolicitarRecuperacionUseCase {
  private readonly logger = new Logger(SolicitarRecuperacionUseCase.name);

  constructor(
    private readonly usuarioRepository: UsuarioRepository,
    private readonly mailService: MailService,
    private readonly resetCodeStore: ResetCodeStore,
  ) {}

  async execute(correo: string): Promise<{ message: string }> {
    const usuario = await this.usuarioRepository.findByCorreo(correo.toLowerCase().trim());

    // Respuesta genérica por seguridad (no revelar si el correo existe)
    const respuesta = { message: 'Si el correo existe, recibirás un código de verificación.' };

    if (!usuario) {
      this.logger.warn(`Solicitud de recuperación para correo no registrado: ${correo}`);
      return respuesta;
    }

    const codigo = Math.floor(100_000 + Math.random() * 900_000).toString();
    this.resetCodeStore.set(correo, codigo);

    try {
      await this.mailService.sendPasswordReset(correo, codigo, usuario.nombre);
    } catch (error) {
      this.logger.error(`No se pudo enviar el email de recuperación a ${correo}: ${error.message}`);
      // Lanza el error al cliente para que sepa que hay un problema de configuración de email
      throw error;
    }

    return respuesta;
  }
}
