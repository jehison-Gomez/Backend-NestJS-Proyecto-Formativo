import { IsEmail, IsNotEmpty } from 'class-validator';

export class RecuperarContrasenaDto {
  @IsEmail({}, { message: 'Correo electrónico inválido' })
  @IsNotEmpty()
  correo: string;
}
