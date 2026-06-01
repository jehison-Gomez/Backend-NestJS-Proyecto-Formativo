import { IsNotEmpty, IsUUID } from 'class-validator';

export class CreateUsuario_permisoDto {
  @IsUUID('4', { message: 'El ID del usuario debe ser un UUID válido' })
  @IsNotEmpty({ message: 'El usuario es obligatorio' })
  usuarioId: string;

  @IsUUID('4', { message: 'El ID del permiso debe ser un UUID válido' })
  @IsNotEmpty({ message: 'El permiso es obligatorio' })
  permisoId: string;
}
