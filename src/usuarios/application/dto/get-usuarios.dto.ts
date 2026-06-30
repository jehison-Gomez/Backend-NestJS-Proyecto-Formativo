import { IsEnum, IsOptional, IsString, IsUUID } from 'class-validator';
import { Type } from 'class-transformer';
import { UsuarioEstado } from '../../domain/usuario-estado.enum';

export class GetUsuariosDto {
  @IsOptional()
  @IsString()
  search?: string;

  @IsOptional()
  @IsUUID('4')
  rolId?: string;

  @IsOptional()
  @IsEnum(UsuarioEstado)
  estado?: UsuarioEstado;

  @IsOptional()
  @Type(() => Number)
  page?: number;

  @IsOptional()
  @Type(() => Number)
  limit?: number;
}
