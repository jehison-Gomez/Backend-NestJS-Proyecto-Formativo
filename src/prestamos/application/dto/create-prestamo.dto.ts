import { Type } from 'class-transformer';
import { IsArray, IsDateString, IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString, IsUUID, Min, MinLength, ValidateNested } from 'class-validator';
import { PrestamoEstado } from '../../domain/prestamo-estado.enum';

export class PrestamoConsumibleItemDto {
  @IsUUID('4', { message: 'El ID del material debe ser un UUID válido' })
  @IsNotEmpty()
  materialeId: string;

  @IsUUID('4', { message: 'El ID del material_consumible debe ser un UUID válido' })
  @IsNotEmpty()
  materialConsumibleId: string;

  @IsNumber()
  @Min(1)
  cantidadPrestada: number;
}

export class CreatePrestamoDto {
  @IsString({ message: 'El motivo debe ser texto' })
  @IsNotEmpty({ message: 'El motivo es obligatorio' })
  @MinLength(5, { message: 'El motivo debe tener al menos 5 caracteres' })
  motivo: string;

  @IsString()
  @IsOptional()
  observacion?: string;

  @IsDateString()
  @IsNotEmpty()
  fechaInicio: string;

  @IsDateString()
  @IsNotEmpty()
  fechaFin: string;

  @IsOptional()
  @IsEnum(PrestamoEstado)
  estado?: PrestamoEstado;

  @IsUUID('4', { message: 'El ID del usuario debe ser un UUID válido' })
  @IsNotEmpty({ message: 'El usuario solicitante es obligatorio' })
  usuarioId: string;

  @IsUUID('4', { message: 'El ID de la ficha debe ser un UUID válido' })
  @IsNotEmpty({ message: 'La ficha es obligatoria' })
  fichaId: string;

  @IsOptional()
  @IsArray()
  @IsUUID('4', { each: true, message: 'Cada ID de beneficiario debe ser un UUID válido' })
  beneficiariosIds?: string[];

  @IsOptional()
  @IsArray()
  @IsUUID('4', { each: true, message: 'Cada ID de material_item debe ser un UUID válido' })
  materialItemIds?: string[];

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => PrestamoConsumibleItemDto)
  materialConsumibles?: PrestamoConsumibleItemDto[];
}
