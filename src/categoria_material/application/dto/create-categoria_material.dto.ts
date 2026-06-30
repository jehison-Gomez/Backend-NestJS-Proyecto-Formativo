import { IsString, IsNotEmpty, IsOptional, IsEnum, IsInt, IsUUID, Min, MinLength } from 'class-validator';
import { Categoria_materialEstado } from '../../domain/categoria_material-estado.enum';

export class CreateCategoria_materialDto {
  @IsString({ message: 'El nombre debe ser texto' })
  @IsNotEmpty({ message: 'El nombre es obligatorio' })
  @MinLength(2, { message: 'El nombre debe tener al menos 2 caracteres' })
  nombre: string;

  @IsString({ message: 'La descripción debe ser texto' })
  @IsNotEmpty({ message: 'La descripción es obligatoria' })
  @MinLength(5, { message: 'La descripción debe tener al menos 5 caracteres' })
  descripcion: string;

  @IsOptional()
  @IsInt()
  @Min(1)
  nivel?: number;

  @IsOptional()
  @IsUUID('4')
  categoriaPadreId?: string;

  @IsOptional()
  @IsEnum(Categoria_materialEstado)
  estado?: Categoria_materialEstado;
}
