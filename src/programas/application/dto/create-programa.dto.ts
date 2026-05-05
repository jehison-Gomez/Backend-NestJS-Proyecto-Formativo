import { IsEnum, IsNotEmpty, IsOptional, IsString, IsUUID, MaxLength, MinLength } from "class-validator";
import { ProgramaEstado } from "src/programas/domain/programa-estado.enum";

export class CreateProgramaDto {
    @IsString({ message: 'El nombre debe ser un texto' })
    @IsNotEmpty({ message: 'El nombre es obligatorio' })
    @MinLength(2, { message: 'El nombre debe tener al menos 2 caracteres' })
    @MaxLength(100, { message: 'El nombre no puede superar los 100 caracteres' })
    nombre: string;

    @IsString({ message: 'El código debe ser un texto' })
    @IsNotEmpty({ message: 'El código es obligatorio' })
    @MinLength(2, { message: 'El código debe tener al menos 2 caracteres' })
    @MaxLength(20, { message: 'El código no puede superar los 20 caracteres' })
    codigo: string;

    @IsOptional()
    @IsString({ message: 'El nivel de formación debe ser un texto' })
    @MaxLength(50, { message: 'El nivel de formación no puede superar los 50 caracteres' })
    nivel_formacion?: string;

    @IsOptional()
    @IsEnum(ProgramaEstado, { message: 'El estado debe ser "activo" o "inactivo"' })
    estado?: ProgramaEstado;

    @IsOptional()
    @IsUUID('4', { message: 'El id_area debe ser un UUID válido' })
    id_area?: string;
}
