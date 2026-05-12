import { IsString, IsNotEmpty, IsOptional, IsEnum } from 'class-validator';
import { ProgramaEstado } from '../../domain/programa-estado.enum';

export class CreateProgramaDto {
  @IsString()
  @IsNotEmpty()
  nombre: string;

  @IsString()
  @IsNotEmpty()
  codigo: string;

  @IsOptional()
  @IsEnum(ProgramaEstado)
  estado?: ProgramaEstado;
}
