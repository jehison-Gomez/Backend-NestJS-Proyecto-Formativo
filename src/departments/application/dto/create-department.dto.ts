import { IsString, MinLength } from "class-validator";

export class CreateDepartmentDto {

    @IsString({ message: 'El nombre debe ser un texto' })
    @MinLength(2, { message: 'EL nombre debe tener al menos 2 caracteres' })
    name: string;
}
