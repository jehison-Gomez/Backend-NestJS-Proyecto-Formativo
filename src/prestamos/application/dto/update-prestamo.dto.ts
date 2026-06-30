import { IsArray, IsDateString, IsEnum, IsOptional, IsString, IsUUID, MinLength } from 'class-validator';
import { PrestamoEstado } from '../../domain/prestamo-estado.enum';

export class UpdatePrestamoDto {
  @IsOptional()
  @IsString()
  @MinLength(5)
  motivo?: string;

  @IsOptional()
  @IsString()
  observacion?: string;

  @IsOptional()
  @IsDateString()
  fechaInicio?: string;

  @IsOptional()
  @IsDateString()
  fechaFin?: string;

  @IsOptional()
  @IsDateString()
  fechaDevolucionEsperada?: string;

  @IsOptional()
  @IsEnum(PrestamoEstado)
  estado?: PrestamoEstado;

  @IsOptional()
  @IsUUID('4')
  solicitanteId?: string;

  @IsOptional()
  @IsUUID('4')
  fichaId?: string;

  @IsOptional()
  @IsArray()
  @IsUUID('4', { each: true })
  beneficiariosIds?: string[];
}
