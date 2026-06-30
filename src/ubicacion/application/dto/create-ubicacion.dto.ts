import { IsString, IsNotEmpty, IsOptional, IsEnum, MinLength, IsUUID } from 'class-validator';
import { UbicacionEstado } from '../../domain/ubicacion-estado.enum';

export class CreateUbicacionDto {
  @IsString({ message: 'El nombre debe ser una cadena de texto' })
  @IsNotEmpty({ message: 'El nombre es requerido' })
  @MinLength(3, { message: 'El nombre debe tener al menos 3 caracteres' })
  nombre: string;

  @IsString({ message: 'La descripción debe ser una cadena de texto' })
  @IsNotEmpty({ message: 'La descripción es requerida' })
  @MinLength(10, { message: 'La descripción debe tener al menos 10 caracteres' })
  descripcion: string;

  @IsOptional()
  @IsEnum(UbicacionEstado)
  estado?: UbicacionEstado;

  @IsUUID('4', { message: 'El ID del tipo de ubicación debe ser un UUID válido' })
  @IsNotEmpty({ message: 'El tipo de ubicación es obligatorio' })
  tipoUbicacionId: string;

  @IsUUID('4', { message: 'El ID del área debe ser un UUID válido' })
  @IsNotEmpty({ message: 'El área es obligatoria' })
  areaId: string;
}
