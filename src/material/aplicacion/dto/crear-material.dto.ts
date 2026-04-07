import { IsString, IsOptional, IsEnum, IsDateString, MinLength, IsInt } from 'class-validator';
import { TipoMaterial } from '../../dominio/material.entidad';

export class CrearMaterialDto {
  @IsString({ message: 'El nombre debe ser texto' })
  @MinLength(2, { message: 'El nombre debe tener mínimo 2 caracteres' })
  nombre: string;

  @IsOptional()
  @IsString()
  codigoUncs?: string;

  @IsOptional()
  @IsString()
  codigoSku?: string;

  @IsOptional()
  @IsString()
  codigoBarras?: string;

  @IsEnum(TipoMaterial, { message: 'Tipo debe ser CONSUMIBLE o DEVOLUTIVO' })
  tipo: TipoMaterial;

  @IsOptional()
  @IsString()
  categoria?: string;

  @IsString({ message: 'Unidad de medida debe ser texto' })
  unidadMedida: string;

  @IsOptional()
  @IsDateString({}, { message: 'Fecha de vencimiento debe ser una fecha válida' })
  fechaVencimiento?: string;

  @IsOptional()
  @IsString()
  lote?: string;

  @IsOptional()
  @IsString()
  estadoFisico?: string;

  @IsOptional()
  @IsInt()
  sitioId?: number;
}