import { IsBoolean, IsInt, IsNotEmpty, IsOptional, IsString, MaxLength, Min, MinLength } from "class-validator";

export class CreateRolDto {
    @IsString({ message: 'El nombre debe ser un texto' })
    @IsNotEmpty({ message: 'El nombre es obligatorio' })
    @MinLength(2, { message: 'El nombre debe tener al menos 2 caracteres' })
    @MaxLength(50, { message: 'El nombre no puede superar los 50 caracteres' })
    nombre: string;

    @IsOptional()
    @IsString({ message: 'La descripción debe ser un texto' })
    @MaxLength(500, { message: 'La descripción no puede superar los 500 caracteres' })
    descripcion?: string;

    @IsOptional()
    @IsInt({ message: 'El nivel de acceso debe ser un número entero' })
    @Min(0, { message: 'El nivel de acceso no puede ser negativo' })
    nivel_acceso?: number;

    @IsOptional()
    @IsBoolean({ message: 'El campo activo debe ser verdadero o falso' })
    activo?: boolean;
}
