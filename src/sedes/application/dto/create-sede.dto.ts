import { IsString, IsNotEmpty, IsOptional, IsEnum, MinLength, IsUUID } from 'class-validator';
import { SedeEstado } from '../../domain/sede-estado.enum';

export class CreateSedeDto {
  @IsString({ message: 'El nombre debe ser texto' })
  @IsNotEmpty({ message: 'El nombre es obligatorio' })
  @MinLength(5, { message: 'El nombre debe tener al menos 5 caracteres' })
  nombre: string;

  @IsString({ message: 'La dirección debe ser texto' })
  @IsNotEmpty({ message: 'La dirección es obligatoria' })
  @MinLength(5, { message: 'La dirección debe tener al menos 5 caracteres' })
  direccion: string;

  @IsOptional()
  @IsEnum(SedeEstado)
  estado?: SedeEstado;

  @IsUUID('4', { message: 'El ID del centro debe ser un UUID válido' })
  @IsNotEmpty({ message: 'El centro es obligatorio' })
  centroId: string;
}
