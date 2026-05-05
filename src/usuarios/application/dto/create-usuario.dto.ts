import { IsEmail, IsEnum, IsNotEmpty, IsOptional, IsString, IsUUID, MaxLength, MinLength } from "class-validator";
import { UsuarioEstado } from "src/usuarios/domain/usuario-estado.enum";

export class CreateUsuarioDto {
    @IsString({ message: 'El nombre debe ser un texto' })
    @IsNotEmpty({ message: 'El nombre es obligatorio' })
    @MinLength(2, { message: 'El nombre debe tener al menos 2 caracteres' })
    @MaxLength(100, { message: 'El nombre no puede superar los 100 caracteres' })
    nombre: string;

    @IsEmail({}, { message: 'El correo debe ser un correo electrónico válido' })
    @IsNotEmpty({ message: 'El correo es obligatorio' })
    @MaxLength(100, { message: 'El correo no puede superar los 100 caracteres' })
    correo: string;

    @IsString({ message: 'La contraseña debe ser un texto' })
    @IsNotEmpty({ message: 'La contraseña es obligatoria' })
    @MinLength(8, { message: 'La contraseña debe tener al menos 8 caracteres' })
    @MaxLength(255, { message: 'La contraseña no puede superar los 255 caracteres' })
    contrasena: string;

    @IsString({ message: 'El teléfono debe ser un texto' })
    @IsNotEmpty({ message: 'El teléfono es obligatorio' })
    @MaxLength(20, { message: 'El teléfono no puede superar los 20 caracteres' })
    telefono: string;

    @IsString({ message: 'El documento debe ser un texto' })
    @IsNotEmpty({ message: 'El documento es obligatorio' })
    @MaxLength(30, { message: 'El documento no puede superar los 30 caracteres' })
    documento: string;

    @IsEnum(UsuarioEstado, { message: 'El estado debe ser "activo" o "inactivo"' })
    estado: UsuarioEstado;

    @IsOptional()
    @IsUUID('4', { message: 'El id_ficha debe ser un UUID válido' })
    id_ficha?: string;

    @IsOptional()
    @IsUUID('4', { message: 'El id_rol debe ser un UUID válido' })
    id_rol?: string;
}
