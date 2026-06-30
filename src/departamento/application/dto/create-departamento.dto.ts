import {
  IsBoolean,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateDepartamentoDto {
  @IsString({ message: 'El nombre debe ser un texto' })
  @IsNotEmpty({ message: 'El nombre del departamento es obligatorio' })
  @MinLength(2, { message: 'El nombre debe tener al menos 2 caracteres' })
  @MaxLength(100, { message: 'El nombre no puede exceder 100 caracteres' })
  nombre!: string;

  @IsString({ message: 'El código debe ser un texto' })
  @IsNotEmpty({ message: 'El código del departamento es obligatorio' })
  @MinLength(2, { message: 'El código debe tener al menos 2 caracteres' })
  @MaxLength(20, { message: 'El código no puede exceder 20 caracteres' })
  codigo!: string;

  @IsOptional()
  @IsBoolean({ message: 'El estado debe ser verdadero o falso' })
  estado?: boolean;
}
