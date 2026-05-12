import { IsString, IsNotEmpty, IsOptional, IsEnum } from 'class-validator';
import { FichaEstado } from '../../domain/ficha-estado.enum';

export class CreateFichaDto {
  @IsString()
  @IsNotEmpty()
  nombre: string;

  @IsString()
  @IsNotEmpty()
  codigo: string;

  @IsOptional()
  @IsEnum(FichaEstado)
  estado?: FichaEstado;
}
