import { IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString, IsUUID, Min } from 'class-validator';
import { MovimientoEstado } from '../../domain/movimiento-estado.enum';
import { MovimientoTipo } from '../../domain/movimiento-tipo.enum';

export class CreateMovimientoDto {
  @IsEnum(MovimientoTipo, { message: 'tipo debe ser "entrada" o "salida"' })
  tipo: MovimientoTipo;

  @IsNumber()
  @Min(0)
  cantidad: number;

  @IsString()
  @IsNotEmpty()
  descripcion: string;

  @IsOptional()
  @IsEnum(MovimientoEstado)
  estado?: MovimientoEstado;

  @IsOptional()
  @IsUUID('4', { message: 'El ID del préstamo debe ser un UUID válido' })
  prestamoId?: string;

  @IsOptional()
  @IsUUID('4', { message: 'El ID del material_item debe ser un UUID válido' })
  materialItemId?: string;
}
