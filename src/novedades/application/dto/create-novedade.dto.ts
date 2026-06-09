import { IsEnum, IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator';
import { NovedadeEstado } from '../../domain/novedade-estado.enum';
import { NovedadeTipo } from '../../domain/novedade-tipo.enum';

export class CreateNovedadeDto {
  @IsString()
  @IsNotEmpty()
  descripcion: string;

  @IsEnum(NovedadeTipo)
  tipo: NovedadeTipo;

  @IsOptional()
  @IsEnum(NovedadeEstado)
  estado?: NovedadeEstado;

  @IsUUID('4')
  @IsNotEmpty()
  reportadoPorId: string;

  @IsOptional()
  @IsUUID('4')
  devolucionItemId?: string;
}
