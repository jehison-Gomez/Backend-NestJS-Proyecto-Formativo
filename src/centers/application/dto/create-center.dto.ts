import { IsString, MinLength, IsUUID } from "class-validator";

export class CreateCenterDto {

    @IsString({ message: 'El nombre debe ser un texto' })
    @MinLength(2, { message: 'El nombre debe tener al menos 2 caracteres' })
    name: string;

    @IsString({ message: 'El código del centro debe ser un texto' })
    @MinLength(2, { message: 'El código del centro debe tener al menos 2 caracteres' })
    center_code: string;

    @IsString({ message: 'La dirección debe ser un texto' })
    @MinLength(5, { message: 'La dirección debe tener al menos 5 caracteres' })
    address: string;

    @IsUUID('4', { message: 'El department_id debe ser un UUID válido' })
    department_id: string;
}
