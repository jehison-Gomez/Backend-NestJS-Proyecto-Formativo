import { IsArray, IsDateString, IsEnum, IsNotEmpty, IsOptional, IsString, IsUUID, MinLength } from 'class-validator';
import { PrestamoEstado } from '../../domain/prestamo-estado.enum';

export class CreatePrestamoDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(5)
  motivo: string;

  @IsOptional()
  @IsString()
  observacion?: string;

  @IsDateString()
  @IsNotEmpty()
  fechaInicio: string;

  @IsDateString()
  @IsNotEmpty()
  fechaFin: string;

  @IsOptional()
  @IsDateString()
  fechaDevolucionEsperada?: string;

  @IsOptional()
  @IsEnum(PrestamoEstado)
  estado?: PrestamoEstado;

  @IsUUID('4')
  @IsNotEmpty()
  solicitanteId: string;

  @IsUUID('4')
  @IsNotEmpty()
  fichaId: string;

  @IsOptional()
  @IsArray()
  @IsUUID('4', { each: true })
  beneficiariosIds?: string[];
}
