import { IsString, IsNotEmpty, IsOptional, IsEnum, IsUUID } from 'class-validator';
import { Material_itemEstado } from '../../domain/material_item-estado.enum';
import { Material_itemEstadoItem } from '../../domain/material_item-estado_item';

export class CreateMaterial_itemDto {
  @IsString()
  @IsNotEmpty()
  codigoSena: string;

  @IsString()
  @IsNotEmpty()
  condicion: string;

  @IsString()
  @IsOptional()
  observacion?: string;

  @IsEnum(Material_itemEstadoItem)
  estadoItem: Material_itemEstadoItem;

  @IsOptional()
  @IsEnum(Material_itemEstado)
  estado?: Material_itemEstado;

  @IsUUID('4', { message: 'El ID del material debe ser un UUID válido' })
  @IsNotEmpty({ message: 'El material es obligatorio' })
  materialeId: string;
}
