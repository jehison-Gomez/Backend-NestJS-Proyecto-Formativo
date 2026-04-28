import { IsNotEmpty, IsString, MaxLength } from "class-validator";

export class CreatePermisoDto {
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
    modulo: string;

    @IsString()
    @IsNotEmpty()
    @MaxLength(100)
    accion: string;

    @IsString()
    @IsNotEmpty()
    activo: string;
}
