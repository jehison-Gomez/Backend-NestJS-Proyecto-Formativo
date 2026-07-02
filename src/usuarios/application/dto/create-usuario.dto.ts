import { IsString, IsNotEmpty, IsOptional, IsEnum, MinLength, IsEmail, IsUUID, IsArray } from 'class-validator';
import { UsuarioEstado } from '../../domain/usuario-estado.enum';

export class CreateUsuarioDto {
  @IsString({ message: 'El nombre debe ser texto' })
  @IsNotEmpty({ message: 'El nombre es obligatorio' })
  @MinLength(2, { message: 'El nombre debe tener al menos 2 caracteres' })
  nombre: string;

  @IsEmail({}, { message: 'El correo debe ser un email válido' })
  @IsNotEmpty({ message: 'El correo es obligatorio' })
  correo: string;

  @IsString({ message: 'La contraseña debe ser texto' })
  @IsNotEmpty({ message: 'La contraseña es obligatoria' })
  @MinLength(8, { message: 'La contraseña debe tener al menos 8 caracteres' })
  contrasena: string;

  @IsString({ message: 'El teléfono debe ser texto' })
  @IsNotEmpty({ message: 'El teléfono es obligatorio' })
  telefono: string;

  @IsString({ message: 'El número de documento debe ser texto' })
  @IsNotEmpty({ message: 'El número de documento es obligatorio' })
  numeroDocumento: string;

  @IsOptional()
  @IsEnum(UsuarioEstado)
  estado?: UsuarioEstado;

  @IsOptional()
  @IsUUID('4', { message: 'El ID de la ficha debe ser un UUID válido' })
  fichaId?: string;

  @IsUUID('4', { message: 'El ID del rol debe ser un UUID válido' })
  @IsNotEmpty({ message: 'El rol es obligatorio' })
  rolId: string;

  @IsOptional()
  @IsUUID('4', { message: 'El ID de la sede debe ser un UUID válido' })
  sedeId?: string;

  @IsOptional()
  @IsArray()
  @IsUUID('4', { each: true, message: 'Cada permiso debe ser un UUID válido' })
  permisosAdicionalesIds?: string[];

  @IsOptional()
  @IsString()
  tipoDocumento?: string;
}
