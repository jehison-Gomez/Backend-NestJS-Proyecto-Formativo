import { IsString, IsNotEmpty, IsOptional, IsEnum, IsDateString, IsUUID } from 'class-validator';
import { FichaEstado } from '../../domain/ficha-estado.enum';

export class CreateFichaDto {
  @IsString({ message: 'El código de ficha debe ser texto' })
  @IsNotEmpty({ message: 'El código de ficha es obligatorio' })
  codigoFicha: string;

  @IsDateString({}, { message: 'La fecha de inicio debe ser una fecha válida (YYYY-MM-DD)' })
  @IsNotEmpty({ message: 'La fecha de inicio es obligatoria' })
  fechaInicio: string;

  @IsDateString({}, { message: 'La fecha de fin debe ser una fecha válida (YYYY-MM-DD)' })
  @IsNotEmpty({ message: 'La fecha de fin es obligatoria' })
  fechaFin: string;

  @IsOptional()
  @IsEnum(FichaEstado)
  estado?: FichaEstado;

  @IsUUID('4', { message: 'El ID del programa debe ser un UUID válido' })
  @IsNotEmpty({ message: 'El programa es obligatorio' })
  programaId: string;

  @IsOptional()
  @IsUUID('4', { message: 'El ID del usuario líder debe ser un UUID válido' })
  usuarioLiderId?: string;
}
