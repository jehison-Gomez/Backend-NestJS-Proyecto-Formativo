import { IsNumber, IsString, IsNotEmpty, IsOptional, IsEnum, IsDateString, Min } from 'class-validator';
import { Material_consumibleEstado } from '../../domain/material_consumible-estado.enum';

export class CreateMaterial_consumibleDto {
  @IsNumber()
  @Min(0)
  stockActual: number;

  @IsNumber()
  @Min(0)
  stockMinimo: number;

  @IsString()
  @IsNotEmpty()
  unidadMedida: string;

  @IsDateString()
  fechaVencimiento: string;

  @IsOptional()
  @IsEnum(Material_consumibleEstado)
  estado?: Material_consumibleEstado;
}
