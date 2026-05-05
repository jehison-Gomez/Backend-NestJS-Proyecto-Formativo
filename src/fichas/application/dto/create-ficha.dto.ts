import { IsDateString, IsEnum, IsNotEmpty, IsOptional, IsString, IsUUID, MaxLength, MinLength } from "class-validator";
import { FichaEstado } from "src/fichas/domain/ficha-estado.enum";

export class CreateFichaDto {

    @IsString({ message: 'El código de ficha debe ser un texto' })
    @IsNotEmpty({ message: 'El código de ficha es obligatorio' })
    @MinLength(6, { message: 'El código de ficha debe tener al menos 6 caracteres' })
    @MaxLength(20, { message: 'El código de ficha no puede superar los 20 caracteres' })
    codigo_ficha: string;

    @IsOptional()
    @IsDateString({}, { message: 'La fecha de inicio debe tener formato de fecha válido (YYYY-MM-DD)' })
    fecha_inicio?: string;

    @IsOptional()
    @IsDateString({}, { message: 'La fecha de fin debe tener formato de fecha válido (YYYY-MM-DD)' })
    fecha_fin?: string;

    @IsOptional()
    @IsEnum(FichaEstado, { message: 'El estado debe ser "activo" o "inactivo"' })
    estado?: FichaEstado;

    @IsUUID('4', { message: 'El id_programa debe ser un UUID válido' })
    @IsNotEmpty({ message: 'El id_programa es obligatorio' })
    id_programa: string;

    @IsOptional()
    @IsUUID('4', { message: 'El id_usuario_lider debe ser un UUID válido' })
    id_usuario_lider?: string;
}
