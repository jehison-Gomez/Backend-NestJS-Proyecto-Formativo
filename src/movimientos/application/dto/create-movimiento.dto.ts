import { IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString, IsUUID, Min } from 'class-validator';
import { MovimientoEstado } from '../../domain/movimiento-estado.enum';
import { MovimientoTipo } from '../../domain/movimiento-tipo.enum';

export class CreateMovimientoDto {
  @IsEnum(MovimientoTipo)
  tipo: MovimientoTipo;

  @IsNumber()
  @Min(0)
  cantidad: number;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  descripcion?: string;

  @IsOptional()
  @IsEnum(MovimientoEstado)
  estado?: MovimientoEstado;

  @IsOptional()
  @IsUUID('4')
  prestamoId?: string;

  @IsOptional()
  @IsUUID('4')
  devolucionId?: string;

  @IsOptional()
  @IsUUID('4')
  materialItemId?: string;

  @IsOptional()
  @IsUUID('4')
  materialConsumibleId?: string;

  @IsOptional()
  @IsUUID('4')
  usuarioId?: string;

  @IsOptional()
  @IsUUID('4')
  fichaId?: string;
}
