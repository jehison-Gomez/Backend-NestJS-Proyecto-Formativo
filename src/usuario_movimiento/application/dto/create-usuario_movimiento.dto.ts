import { IsEnum, IsNotEmpty, IsOptional, IsUUID } from 'class-validator';
import { Usuario_movimientoEstado } from '../../domain/usuario_movimiento-estado.enum';

export class CreateUsuario_movimientoDto {
  @IsUUID('4', { message: 'El ID del usuario debe ser un UUID válido' })
  @IsNotEmpty({ message: 'El usuario es obligatorio' })
  usuarioId: string;

  @IsUUID('4', { message: 'El ID del movimiento debe ser un UUID válido' })
  @IsNotEmpty({ message: 'El movimiento es obligatorio' })
  movimientoId: string;

  @IsOptional()
  @IsEnum(Usuario_movimientoEstado)
  estado?: Usuario_movimientoEstado;
}
