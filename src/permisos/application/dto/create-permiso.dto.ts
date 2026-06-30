import { IsString, IsNotEmpty, IsOptional, IsEnum, MinLength } from 'class-validator';
import { PermisoEstado } from '../../domain/permiso-estado.enum';

export class CreatePermisoDto {
  @IsString({ message: 'El nombre debe ser texto' })
  @IsNotEmpty({ message: 'El nombre es obligatorio' })
  @MinLength(2, { message: 'El nombre debe tener al menos 2 caracteres' })
  nombre: string;

  @IsString({ message: 'La descripción debe ser texto' })
  @IsNotEmpty({ message: 'La descripción es obligatoria' })
  descripcion: string;

  @IsString({ message: 'El módulo debe ser texto' })
  @IsNotEmpty({ message: 'El módulo es obligatorio' })
  modulo: string;

  @IsString({ message: 'La acción debe ser texto' })
  @IsNotEmpty({ message: 'La acción es obligatoria' })
  accion: string;

  @IsOptional()
  @IsEnum(PermisoEstado)
  estado?: PermisoEstado;
}
