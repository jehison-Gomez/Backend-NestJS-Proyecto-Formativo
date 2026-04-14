import { IsInt, IsOptional, IsString, IsEnum, IsDateString } from 'class-validator';
import { EstadoTraslado } from '../../dominio/traslado.entidad';

export class CrearTrasladoDto {
  @IsDateString()
  fechaTraslado: string;

  @IsOptional() @IsString()
  motivo?: string;

  @IsEnum(EstadoTraslado)
  estado: EstadoTraslado;

  @IsInt() usuarioId: number;
  @IsInt() ubicacionDestinoId: number;
  @IsInt() ubicacionOrigenId: number;
}