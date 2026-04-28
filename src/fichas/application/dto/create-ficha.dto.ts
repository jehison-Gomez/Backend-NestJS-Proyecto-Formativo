import { IsNotEmpty, IsString, IsUUID, MaxLength } from "class-validator";

export class CreateFichaDto {
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
    @MaxLength(100)
    nivel_formacion: string;

    @IsString()
    @IsNotEmpty()
    @MaxLength(100)
    estado: string;

    @IsUUID()
    @IsNotEmpty()
    id_area: string;
}
