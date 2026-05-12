import { IsString, IsNotEmpty, IsOptional, IsEnum, MinLength, IsUUID } from 'class-validator';
import { AreaEstado } from '../../domain/area-estado.enum';

export class CreateAreaDto {
  @IsString({ message: 'El nombre debe ser texto' })
  @IsNotEmpty({ message: 'El nombre es obligatorio' })
  @MinLength(5, { message: 'El nombre debe tener al menos 5 caracteres' })
  nombre: string;

  @IsString({ message: 'La descripción debe ser texto' })
  @IsNotEmpty({ message: 'La descripción es obligatoria' })
  descripcion: string;

  @IsOptional()
  @IsEnum(AreaEstado)
  estado?: AreaEstado;

  @IsUUID('4', { message: 'El ID de la sede debe ser un UUID válido' })
  @IsNotEmpty({ message: 'La sede es obligatoria' })
  sedeId: string;
}
