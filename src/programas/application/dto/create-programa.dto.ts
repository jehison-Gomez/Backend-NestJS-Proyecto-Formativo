import { IsNotEmpty, IsString, IsUUID, MaxLength, IsEnum } from "class-validator";
import { ProgramaEstado } from "src/programas/domain/programa-estado.enum";

export class CreateProgramaDto {
    @IsString()
    @IsNotEmpty()
    @MaxLength(100)
    nombre: string;

    @IsString()
    @IsNotEmpty()
    @MaxLength(20)
    codigo: string;

    @IsString()
    @IsNotEmpty()
    @MaxLength(50)
    nivel_formacion: string;

    @IsEnum(ProgramaEstado)
    estado: ProgramaEstado;

    @IsUUID()
    @IsNotEmpty()
    id_area: string;
}
