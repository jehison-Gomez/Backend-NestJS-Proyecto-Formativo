import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { UsuarioRepository } from 'src/usuarios/domain/usuario.repository';
import { ResetCodeStore } from '../reset-code.store';

@Injectable()
export class RestablecerContrasenaUseCase {
  constructor(
    private readonly usuarioRepository: UsuarioRepository,
    private readonly resetCodeStore: ResetCodeStore,
  ) {}

  async execute(correo: string, codigo: string, nuevaContrasena: string): Promise<{ message: string }> {
    const correoNorm = correo.toLowerCase().trim();

    // Verifica que el código esté validado (se verificó en el paso anterior)
    if (!this.resetCodeStore.isVerified(correoNorm)) {
      throw new BadRequestException('El código no ha sido verificado o ha expirado. Inicia el proceso nuevamente.');
    }

    const usuario = await this.usuarioRepository.findByCorreo(correoNorm);
    if (!usuario) throw new NotFoundException('Usuario no encontrado.');

    // El @BeforeUpdate en el ORM entity hashea automáticamente la contraseña
    await this.usuarioRepository.update(usuario.id, { contrasena: nuevaContrasena });

    // Elimina el código usado
    this.resetCodeStore.delete(correoNorm);

    return { message: 'Contraseña restablecida exitosamente.' };
  }
}
