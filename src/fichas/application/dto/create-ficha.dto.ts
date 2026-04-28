import { IsDateString, IsEnum, IsNotEmpty, IsOptional, IsString, IsUUID, MaxLength } from "class-validator";
import { FichaEstado } from "src/fichas/domain/ficha-estado.enum";

export class CreateFichaDto {

    @IsString()
    @IsNotEmpty()
    @MaxLength(20)
    codigo_ficha: string;

    @IsDateString()
    fecha_inicio: string;

    @IsDateString()
    fecha_fin: string;

    @IsEnum(FichaEstado)
    estado: FichaEstado;

    @IsUUID()
    @IsNotEmpty()
    id_programa: string;

    @IsOptional()
    @IsUUID()
    id_usuario_lider?: string;
}