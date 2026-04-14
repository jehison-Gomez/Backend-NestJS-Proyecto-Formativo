import { IsInt, IsOptional, IsString, IsEnum, IsDateString } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'; 
import { EstadoTraslado } from '../../dominio/traslado.entidad';

export class CrearTrasladoDto {
  @ApiProperty()
  @IsDateString()
  fechaTraslado: string;

  @ApiPropertyOptional() 
  @IsOptional() 
  @IsString()
  motivo?: string;

  @ApiProperty({ enum: EstadoTraslado }) 
  @IsEnum(EstadoTraslado)
  estado: EstadoTraslado;

  @ApiProperty()
  @IsInt() 
  usuarioId: number;

  @ApiProperty()
  @IsInt() 
  ubicacionDestinoId: number;

  @ApiProperty()
  @IsInt() 
  ubicacionOrigenId: number;
}