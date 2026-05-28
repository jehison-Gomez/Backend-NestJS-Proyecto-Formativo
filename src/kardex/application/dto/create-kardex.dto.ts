import { IsEnum, IsNotEmpty, IsNumber, IsOptional, IsUUID, Min } from 'class-validator';
import { KardexEstado } from '../../domain/kardex-estado.enum';

export class CreateKardexDto {
  @IsNumber()
  @Min(0)
  cantidad: number;

  @IsNumber()
  @Min(0)
  cantidadAnterior: number;

  @IsNumber()
  @Min(0)
  cantidadActual: number;

  @IsOptional()
  @IsEnum(KardexEstado)
  estado?: KardexEstado;

  @IsUUID('4', { message: 'El ID de la ficha debe ser un UUID válido' })
  @IsNotEmpty({ message: 'La ficha es obligatoria' })
  fichaId: string;

  @IsUUID('4', { message: 'El ID del préstamo debe ser un UUID válido' })
  @IsNotEmpty({ message: 'El préstamo es obligatorio' })
  prestamoId: string;

  @IsUUID('4', { message: 'El ID del usuario debe ser un UUID válido' })
  @IsNotEmpty({ message: 'El usuario es obligatorio' })
  usuarioId: string;

  @IsUUID('4', { message: 'El ID del material debe ser un UUID válido' })
  @IsNotEmpty({ message: 'El material es obligatorio' })
  materialId: string;

  @IsUUID('4', { message: 'El ID de la ubicación debe ser un UUID válido' })
  @IsNotEmpty({ message: 'La ubicación es obligatoria' })
  ubicacionId: string;

  @IsUUID('4', { message: 'El ID del movimiento debe ser un UUID válido' })
  @IsNotEmpty({ message: 'El movimiento es obligatorio' })
  movimientoId: string;
}
