import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsEnum, IsInt, IsOptional, IsDateString, IsString } from 'class-validator';
import { EstadoAprobacion } from '../../dominio/aprobacion.entidad.js';
export class CrearAprobacionDto {
  @ApiPropertyOptional({ example: '2025-04-26' })
  @IsOptional() @IsDateString()
  fechaAprobacion?: string;

  @ApiProperty({ enum: EstadoAprobacion })
  @IsEnum(EstadoAprobacion)
  estado: EstadoAprobacion;

  @ApiPropertyOptional() @IsOptional() @IsString()
  observacion?: string;

  @ApiPropertyOptional({ example: 1 }) @IsOptional() @IsInt()
  nivel?: number;

  @ApiProperty({ example: 1 }) @IsInt()
  idPrestamo: number;

  @ApiProperty({ example: 1 }) @IsInt()
  idAprobador: number;
}