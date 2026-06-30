import { IsNumber, IsString, IsOptional, IsEnum, IsDateString, Min } from 'class-validator';
import { Material_consumibleEstado } from '../../domain/material_consumible-estado.enum';

export class UpdateMaterial_consumibleDto {
  @IsOptional()
  @IsNumber()
  @Min(0)
  stockActual?: number;

  @IsOptional()
  @IsNumber()
  @Min(0)
  stockMinimo?: number;

  @IsOptional()
  @IsString()
  unidadMedida?: string;

  @IsOptional()
  @IsDateString()
  fechaVencimiento?: string;

  @IsOptional()
  @IsEnum(Material_consumibleEstado)
  estado?: Material_consumibleEstado;
}
