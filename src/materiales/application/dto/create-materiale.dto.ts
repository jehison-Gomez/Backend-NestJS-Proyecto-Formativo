import { IsString, IsNotEmpty, IsOptional, IsEnum, MinLength, IsUUID } from 'class-validator';
import { MaterialeEstado } from '../../domain/materiale-estado.enum';
import { TipoMateriale } from '../../domain/tipo-materiale.enum';

export class CreateMaterialeDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  nombre: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(5)
  descripcion: string;

  @IsOptional()
  @IsString()
  sku?: string;

  @IsOptional()
  @IsString()
  codigoUnspsc?: string;

  @IsOptional()
  @IsEnum(MaterialeEstado)
  estado?: MaterialeEstado;

  @IsUUID('4')
  @IsNotEmpty()
  categoriaMaterialId: string;

  @IsUUID('4')
  @IsNotEmpty()
  fichaId: string;

  @IsEnum(TipoMateriale)
  @IsNotEmpty()
  tipo: TipoMateriale;

  @IsOptional()
  @IsUUID('4')
  ubicacionId?: string;
}
