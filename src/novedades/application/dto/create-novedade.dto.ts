import { IsEnum, IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator';
import { NovedadeEstado } from '../../domain/novedade-estado.enum';
import { NovedadeTipo } from '../../domain/novedade-tipo.enum';

export class CreateNovedadeDto {
  @IsString()
  @IsNotEmpty()
  descripcion: string;

  @IsEnum(NovedadeTipo, { message: 'tipo debe ser daño, pérdida o destruido' })
  tipo: NovedadeTipo;

  @IsOptional()
  @IsEnum(NovedadeEstado)
  estado?: NovedadeEstado;

  @IsUUID('4', { message: 'El ID del usuario debe ser un UUID válido' })
  @IsNotEmpty({ message: 'El usuario es obligatorio' })
  usuarioId: string;

  @IsUUID('4', { message: 'El ID de la devolución debe ser un UUID válido' })
  @IsNotEmpty({ message: 'La devolución es obligatoria' })
  devolucionId: string;
}
