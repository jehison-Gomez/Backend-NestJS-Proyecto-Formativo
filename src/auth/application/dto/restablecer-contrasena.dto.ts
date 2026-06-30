import { IsEmail, IsNotEmpty, IsString, Length, MinLength } from 'class-validator';

export class RestablecerContrasenaDto {
  @IsEmail({}, { message: 'Correo electrónico inválido' })
  @IsNotEmpty()
  correo: string;

  @IsString()
  @IsNotEmpty()
  @Length(6, 6, { message: 'El código debe tener exactamente 6 dígitos' })
  codigo: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(8, { message: 'La contraseña debe tener al menos 8 caracteres' })
  nuevaContrasena: string;
}
