import { IsArray, IsDateString, IsEnum, IsOptional, IsString, IsUUID } from 'class-validator';
import { PrestamoEstado } from '../../domain/prestamo-estado.enum';

export class UpdatePrestamoDto {
  @IsString()
  @IsOptional()
  motivo?: string;

  @IsString()
  @IsOptional()
  observacion?: string;

  @IsDateString()
  @IsOptional()
  fechaInicio?: string;

  @IsDateString()
  @IsOptional()
  fechaFin?: string;

  @IsOptional()
  @IsEnum(PrestamoEstado)
  estado?: PrestamoEstado;

  @IsUUID('4', { message: 'El ID del usuario debe ser un UUID válido' })
  @IsOptional()
  usuarioId?: string;

  @IsUUID('4', { message: 'El ID de la ficha debe ser un UUID válido' })
  @IsOptional()
  fichaId?: string;

  @IsOptional()
  @IsArray()
  @IsUUID('4', { each: true, message: 'Cada ID de material_item debe ser un UUID válido' })
  materialItemIds?: string[];

  @IsOptional()
  @IsArray()
  @IsUUID('4', { each: true, message: 'Cada ID de beneficiario debe ser un UUID válido' })
  beneficiariosIds?: string[];
}
