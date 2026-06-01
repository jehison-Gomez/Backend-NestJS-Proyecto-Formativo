import { IsNumber, IsString, IsNotEmpty, IsOptional, IsEnum, IsDateString, IsUUID, Min } from 'class-validator';
import { Material_consumibleEstado } from '../../domain/material_consumible-estado.enum';

export class CreateMaterial_consumibleDto {
  @IsNumber()
  @Min(0)
  stockActual: number;

  @IsNumber()
  @Min(0)
  stockMinimo: number;

  @IsString()
  @IsNotEmpty()
  unidadMedida: string;

  @IsDateString()
  fechaVencimiento: string;

  @IsOptional()
  @IsEnum(Material_consumibleEstado)
  estado?: Material_consumibleEstado;

  @IsUUID('4', { message: 'El ID del material debe ser un UUID válido' })
  @IsNotEmpty({ message: 'El material es obligatorio' })
  materialeId: string;
}
