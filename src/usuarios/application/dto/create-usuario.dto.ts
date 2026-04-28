import { IsEnum, IsNotEmpty, IsString, IsUUID, MaxLength } from "class-validator";
import { UsuarioEstado } from "src/usuarios/domain/usuario-estado.enum";

export class CreateUsuarioDto {
    @IsString()
    @IsNotEmpty()
    @MaxLength(100)
    nombre: string;

    @IsString()
    @IsNotEmpty()
    @MaxLength(20)
    correo: string;

    @IsString()
    @IsNotEmpty()
    @MaxLength(100)
    contrasena: string;

    @IsString()
    @IsNotEmpty()
    @MaxLength(100)
    telefono: string;

    @IsString()
    @IsNotEmpty()
    @MaxLength(100)
    documento: string;

    @IsEnum(UsuarioEstado)
    estado: UsuarioEstado;

    @IsString()
    @IsNotEmpty()
    @MaxLength(100)
    fecha_registro: Date;

    @IsString()
    @IsNotEmpty()
    @MaxLength(100)
    ultimo_acceso: Date;

    @IsUUID()
    @IsNotEmpty()
    id_ficha?: string;
}
