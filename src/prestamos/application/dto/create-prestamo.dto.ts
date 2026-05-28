import { IsDateString, IsEnum, IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator';
import { PrestamoEstado } from '../../domain/prestamo-estado.enum';

export class CreatePrestamoDto {
  @IsString()
  @IsOptional()
  observacion?: string;

  @IsDateString()
  @IsNotEmpty()
  fechaInicio: string;

  @IsDateString()
  @IsNotEmpty()
  fechaFin: string;

  @IsOptional()
  @IsEnum(PrestamoEstado)
  estado?: PrestamoEstado;

  @IsUUID('4', { message: 'El ID del usuario debe ser un UUID válido' })
  @IsNotEmpty({ message: 'El usuario es obligatorio' })
  usuarioId: string;

  @IsUUID('4', { message: 'El ID de la ficha debe ser un UUID válido' })
  @IsNotEmpty({ message: 'La ficha es obligatoria' })
  fichaId: string;
}
