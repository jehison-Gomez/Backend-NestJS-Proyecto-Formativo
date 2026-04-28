import { IsString, MinLength, IsUUID } from 'class-validator';

export class CreateAreaDto {
  @IsString({ message: 'El nombre debe ser un texto' })
  @MinLength(2, { message: 'El nombre debe tener al menos 2 caracteres' })
  name: string;

  @IsUUID(undefined, { message: 'El site_id debe ser un UUID válido' })
  site_id: string;
}
