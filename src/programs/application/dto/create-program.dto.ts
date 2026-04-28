import { IsString, MinLength, IsUUID } from 'class-validator';

export class CreateProgramDto {
  @IsString({ message: 'El nombre debe ser un texto' })
  @MinLength(2, { message: 'El nombre debe tener al menos 2 caracteres' })
  name: string;

  @IsString({ message: 'La descripción debe ser un texto' })
  @MinLength(10, {
    message: 'La descripción debe tener al menos 10 caracteres',
  })
  description: string;

  @IsUUID(undefined, { message: 'El area_id debe ser un UUID válido' })
  area_id: string;
}
