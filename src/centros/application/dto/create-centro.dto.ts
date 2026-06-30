import { IsString, IsNotEmpty, IsOptional, IsEnum, MinLength, IsUUID } from 'class-validator';
import { CentroEstado } from '../../domain/centro-estado.enum';

export class CreateCentroDto {
  @IsString({ message: 'El nombre debe ser texto' })
  @IsNotEmpty({ message: 'El nombre es obligatorio' })
  @MinLength(5, { message: 'El nombre debe tener al menos 5 caracteres' })
  nombre: string;

  @IsString({ message: 'El código debe ser texto' })
  @IsNotEmpty({ message: 'El código es obligatorio' })
  @MinLength(5, { message: 'El código debe tener al menos 5 caracteres' })
  codigo: string;

  @IsString({ message: 'La dirección debe ser texto' })
  @IsNotEmpty({ message: 'La dirección es obligatoria' })
  direccion: string;

  @IsOptional()
  @IsEnum(CentroEstado)
  estado?: CentroEstado;

  @IsUUID('4', { message: 'El ID del municipio debe ser un UUID válido' })
  @IsNotEmpty({ message: 'El municipio es obligatorio' })
  municipioId: string;
}
