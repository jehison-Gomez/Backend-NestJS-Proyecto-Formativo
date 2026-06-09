import { IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString, IsUUID, MaxLength, Min } from 'class-validator';
import { PrestamoConsumibleEstado } from '../../domain/prestamo_consumible-estado.enum';

export class CreatePrestamoConsumibleDto {
  @IsUUID('4')
  @IsNotEmpty()
  prestamoId: string;

  @IsUUID('4')
  @IsNotEmpty()
  materialConsumibleId: string;

  @IsNumber()
  @Min(0.01)
  cantidadSolicitada: number;

  @IsOptional()
  @IsNumber()
  @Min(0)
  cantidadAprobada?: number;

  @IsOptional()
  @IsString()
  @MaxLength(255)
  observacion?: string;

  @IsOptional()
  @IsEnum(PrestamoConsumibleEstado)
  estado?: PrestamoConsumibleEstado;
}
