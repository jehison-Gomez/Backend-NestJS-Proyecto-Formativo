import { IsNotEmpty, IsString, IsUUID, MaxLength } from "class-validator";

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

    @IsString()
    @IsNotEmpty()
    @MaxLength(100)
    estado: string;

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
