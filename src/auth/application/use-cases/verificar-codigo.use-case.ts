import { BadRequestException, Injectable } from '@nestjs/common';
import { ResetCodeStore } from '../reset-code.store';

@Injectable()
export class VerificarCodigoUseCase {
  constructor(private readonly resetCodeStore: ResetCodeStore) {}

  execute(correo: string, codigo: string): { message: string } {
    const valido = this.resetCodeStore.verify(correo.toLowerCase().trim(), codigo.trim());
    if (!valido) {
      throw new BadRequestException('Código inválido o expirado. Solicita uno nuevo.');
    }
    return { message: 'Código verificado correctamente.' };
  }
}
