import { IsNotEmpty, IsString, IsUUID, MaxLength } from "class-validator";

export class CreatePermisoDto {
    @IsString()
    @IsNotEmpty()
    @MaxLength(100)
    nombre: string;

    @IsString()
    @IsNotEmpty()
    @MaxLength(20)
    descripcion: string;

    @IsString()
    @IsNotEmpty()
    @MaxLength(100)
    modulo: string;

    @IsString()
    @IsNotEmpty()
    @MaxLength(100)
    accion: string;

    @IsUUID()
    @IsNotEmpty()
    activo: string;
}
