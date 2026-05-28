import { IsString, IsNotEmpty, IsOptional, IsEnum } from 'class-validator';
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
}
