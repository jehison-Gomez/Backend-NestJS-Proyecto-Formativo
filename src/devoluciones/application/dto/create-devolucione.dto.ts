import { IsDateString, IsEnum, IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator';
import { DevolucioneEstado } from '../../domain/devolucione-estado.enum';

export class CreateDevolucioneDto {
  @IsDateString()
  @IsNotEmpty()
  fechaDevolucion: string;

  @IsString()
  @IsOptional()
  observacion?: string;

  @IsOptional()
  @IsEnum(DevolucioneEstado)
  estado?: DevolucioneEstado;

  @IsUUID('4', { message: 'El ID del usuario debe ser un UUID válido' })
  @IsNotEmpty({ message: 'El usuario es obligatorio' })
  usuarioId: string;
}
