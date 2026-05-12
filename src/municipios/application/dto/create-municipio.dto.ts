import { IsString, IsNotEmpty, IsOptional, IsEnum, IsUUID, MinLength } from 'class-validator';
import { MunicipioEstado } from '../../domain/municipio-estado.enum';

export class CreateMunicipioDto {
  @IsString({ message: 'El nombre debe ser texto' })
  @IsNotEmpty({ message: 'EL nombre es obligatorio' })
  @MinLength(5, { message: 'El nombre debe tener al menos 5 caracteres' })
  nombre: string;

  @IsString({ message: 'El código debe ser un texto' })
  @IsNotEmpty({ message: 'El código es obligatorio' })
  @MinLength(5, { message: 'El código debe tener al menos 5 caracteres' })
  codigo: string;

  @IsOptional()
  @IsEnum(MunicipioEstado)
  estado?: MunicipioEstado;

  @IsUUID('4', { message: 'El ID del departamento debe ser un UUID válido' })
  @IsNotEmpty({ message: 'El departamento es obligatorio' })
  departamentoId: string;
}
