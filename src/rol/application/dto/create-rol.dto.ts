import { IsNotEmpty, IsString, IsUUID, MaxLength } from "class-validator";

export class CreateRolDto {
    @IsString()
    @IsNotEmpty()
    @MaxLength(100)
    nombre: string;

    @IsString()
    @IsNotEmpty()
    @MaxLength(100)
    descripcion: string;

    @IsString()
    @IsNotEmpty()
    @MaxLength(100)
    nivel_acceso: string;

    @IsString()
    @IsNotEmpty()
    @MaxLength(100)
    activo: string;

    @IsUUID()
    @IsNotEmpty()
    id_usuario: string;
}
