import {
  IsBoolean,
  IsInt,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateSedeDto {
  @IsString({ message: 'El nombre debe ser un texto' })
  @MinLength(2, { message: 'El nombre debe tener al menos 2 caracteres' })
  @MaxLength(100, { message: 'El nombre no puede exceder 100 caracteres' })
  nombre!: string;

  @IsString({ message: 'La dirección debe ser un texto' })
  @MaxLength(200, { message: 'La dirección no puede exceder 200 caracteres' })
  direccion!: string;

  @IsOptional()
  @IsBoolean({ message: 'El estado debe ser verdadero o falso' })
  estado?: boolean;

  @IsOptional()
  @IsInt({ message: 'El id_centro debe ser un número entero' })
  id_centro?: number;
}
