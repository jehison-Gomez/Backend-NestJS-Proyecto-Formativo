import { IsBoolean, IsEnum, IsNotEmpty, IsOptional, IsString, IsUUID, MaxLength } from 'class-validator';
import { PrestamoItemEstado } from '../../domain/prestamo_item-estado.enum';

export class CreatePrestamoItemDto {
  @IsUUID('4')
  @IsNotEmpty()
  prestamoId: string;

  @IsUUID('4')
  @IsNotEmpty()
  materialItemId: string;

  @IsOptional()
  @IsBoolean()
  incluidoEnAprobacion?: boolean;

  @IsOptional()
  @IsString()
  @MaxLength(255)
  observacion?: string;

  @IsOptional()
  @IsEnum(PrestamoItemEstado)
  estado?: PrestamoItemEstado;
}
