import { IsString, IsOptional, IsEnum, IsDateString, MinLength, IsInt } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { TipoMaterial } from '../../dominio/material.entidad';

export class CrearMaterialDto {
  @ApiProperty() @IsString() @MinLength(2) nombre: string;
  @ApiProperty({ enum: TipoMaterial }) @IsEnum(TipoMaterial) tipo: TipoMaterial;
  @ApiProperty() @IsString() unidadMedida: string;

  @ApiPropertyOptional() @IsOptional() @IsString() codigoUncs?: string;
  @ApiPropertyOptional() @IsOptional() @IsString() codigoSku?: string;
  @ApiPropertyOptional() @IsOptional() @IsString() codigoBarras?: string;
  @ApiPropertyOptional() @IsOptional() @IsString() categoria?: string;
  @ApiPropertyOptional() @IsOptional() @IsDateString() fechaVencimiento?: string;
  @ApiPropertyOptional() @IsOptional() @IsString() lote?: string;
  @ApiPropertyOptional() @IsOptional() @IsString() estadoFisico?: string;
  @ApiPropertyOptional() @IsOptional() @IsInt() sitioId?: number;
}