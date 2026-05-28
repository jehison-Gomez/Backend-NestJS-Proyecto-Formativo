import { IsString, IsNotEmpty, IsOptional, IsEnum, MinLength, IsUUID } from 'class-validator';
import { MaterialeEstado } from '../../domain/materiale-estado.enum';
import { TipoMateriale } from '../../domain/tipo-materiale.enum';

export class CreateMaterialeDto {
  @IsString({ message: 'El nombre debe ser texto' })
  @IsNotEmpty({ message: 'El nombre es obligatorio' })
  @MinLength(3, { message: 'El nombre debe tener al menos 3 caracteres' })
  nombre: string;

  @IsString({ message: 'La descripción debe ser texto' })
  @IsNotEmpty({ message: 'La descripción es obligatoria' })
  @MinLength(5, { message: 'La descripción debe tener al menos 5 caracteres' })
  descripcion: string;

  @IsOptional()
  @IsEnum(MaterialeEstado)
  estado?: MaterialeEstado;

  @IsUUID('4', { message: 'El ID de la categoría debe ser un UUID válido' })
  @IsNotEmpty({ message: 'La categoría del material es obligatoria' })
  categoriaMaterialId: string;

  @IsUUID('4', { message: 'El ID de la ficha debe ser un UUID válido' })
  @IsNotEmpty({ message: 'La ficha es obligatoria' })
  fichaId: string;

  @IsOptional()
  @IsEnum(TipoMateriale, { message: 'tipoMaterial debe ser "item" o "consumible"' })
  tipoMaterial?: TipoMateriale;

  @IsOptional()
  @IsUUID('4', { message: 'El ID del tipo de material debe ser un UUID válido' })
  tipoMaterialId?: string;
}
