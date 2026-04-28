import { IsString, MinLength, IsUUID } from 'class-validator';

export class CreateSiteDto {
  @IsString({ message: 'El nombre debe ser un texto' })
  @MinLength(2, { message: 'El nombre debe tener al menos 2 caracteres' })
  name: string;

  @IsString({ message: 'La dirección debe ser un texto' })
  @MinLength(5, { message: 'La dirección debe tener al menos 5 caracteres' })
  address: string;

  @IsUUID('4', { message: 'El center_id debe ser un UUID válido' })
  center_id: string;
}
