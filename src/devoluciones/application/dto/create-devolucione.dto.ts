import { IsDateString, IsEnum, IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator';
import { DevolucioneEstado } from '../../domain/devolucione-estado.enum';

export class CreateDevolucioneDto {
  @IsDateString()
  @IsNotEmpty()
  fechaDevolucion: string;

  @IsOptional()
  @IsString()
  observacion?: string;

  @IsOptional()
  @IsEnum(DevolucioneEstado)
  estado?: DevolucioneEstado;

  @IsUUID('4')
  @IsNotEmpty()
  prestamoId: string;

  @IsUUID('4')
  @IsNotEmpty()
  recibidoPorId: string;
}
