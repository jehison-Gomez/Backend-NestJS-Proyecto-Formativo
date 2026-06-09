import { IsEnum, IsNotEmpty, IsNumber, IsOptional, IsUUID, Min } from 'class-validator';
import { KardexEstado } from '../../domain/kardex-estado.enum';

export class CreateKardexDto {
  @IsUUID('4') @IsNotEmpty() movimientoId: string;
  @IsUUID('4') @IsNotEmpty() fichaId: string;
  @IsUUID('4') @IsNotEmpty() usuarioId: string;

  @IsOptional() @IsUUID('4') prestamoId?: string;
  @IsOptional() @IsUUID('4') devolucionId?: string;
  @IsOptional() @IsUUID('4') materialConsumibleId?: string;
  @IsOptional() @IsUUID('4') materialItemId?: string;

  @IsNumber() @Min(0) cantidad: number;

  @IsOptional() @IsNumber() saldoAnterior?: number;
  @IsOptional() @IsNumber() saldoActual?: number;

  @IsOptional() @IsEnum(KardexEstado) estado?: KardexEstado;
}
