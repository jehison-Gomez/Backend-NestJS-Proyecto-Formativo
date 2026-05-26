import { IsString, IsNotEmpty, IsOptional, IsEnum } from 'class-validator';
import { Tipo_ubicacionEstado } from '../../domain/tipo_ubicacion-estado.enum';

export class CreateTipo_ubicacionDto {
  @IsString({ message: 'El nombre del tipo de ubicacion debe ser texto' })
  @IsNotEmpty({ message: 'El nombre del tipo de ubicacion es obligatorio' })
  nombre: string;

  @IsString({ message: 'La descripcion del tipo de ubicacion debe ser texto' })
  @IsNotEmpty({ message: 'La descripcion del tipo de ubicacion es obligatoria' })
  descripcion: string;

  @IsOptional()
  @IsEnum(Tipo_ubicacionEstado)
  estado?: Tipo_ubicacionEstado;
}
