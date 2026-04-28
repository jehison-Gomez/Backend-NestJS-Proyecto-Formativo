import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsEnum, IsDateString, IsOptional, IsInt, MinLength } from 'class-validator';
import { EstadoPrestamo } from '../../dominio/prestamo.entidad.js';

export class CrearPrestamoDto {
  @ApiProperty({ example: 'PREST-001' })
  @IsString() @MinLength(3)
  codigoPrestamo: string;

  @ApiProperty({ example: '2025-04-26' })
  @IsDateString()
  fechaSolicitud: string;

  @ApiPropertyOptional({ example: '2025-05-01' })
  @IsOptional() @IsDateString()
  fechaAprobacion?: string;

  @ApiPropertyOptional({ example: '2025-06-01' })
  @IsOptional() @IsDateString()
  fechaVencimiento?: string;

  @ApiProperty({ enum: EstadoPrestamo, example: EstadoPrestamo.PENDIENTE })
  @IsEnum(EstadoPrestamo)
  estado: EstadoPrestamo;

  @ApiPropertyOptional({ example: 'Préstamo para laboratorio' })
  @IsOptional() @IsString()
  observacion?: string;

  @ApiProperty({ example: 1 })
  @IsInt()
  idUsuario: number;
}