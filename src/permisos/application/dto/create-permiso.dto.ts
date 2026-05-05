import { IsBoolean, IsNotEmpty, IsOptional, IsString, MaxLength, MinLength } from "class-validator";

export class CreatePermisoDto {
    @IsString({ message: 'El nombre debe ser un texto' })
    @IsNotEmpty({ message: 'El nombre es obligatorio' })
    @MinLength(2, { message: 'El nombre debe tener al menos 2 caracteres' })
    @MaxLength(100, { message: 'El nombre no puede superar los 100 caracteres' })
    nombre: string;

    @IsOptional()
    @IsString({ message: 'La descripción debe ser un texto' })
    descripcion?: string;

    @IsString({ message: 'El módulo debe ser un texto' })
    @IsNotEmpty({ message: 'El módulo es obligatorio' })
    @MinLength(2, { message: 'El módulo debe tener al menos 2 caracteres' })
    @MaxLength(50, { message: 'El módulo no puede superar los 50 caracteres' })
    modulo: string;

    @IsOptional()
    @IsString({ message: 'La acción debe ser un texto' })
    @MaxLength(50, { message: 'La acción no puede superar los 50 caracteres' })
    accion?: string;

    @IsOptional()
    @IsBoolean({ message: 'El campo activo debe ser verdadero o falso' })
    activo?: boolean;
}
