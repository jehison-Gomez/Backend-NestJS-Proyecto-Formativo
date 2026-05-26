import { IsUUID } from 'class-validator';

export class CreateRol_permisoDto {
  @IsUUID('4', { message: 'rolId debe ser un UUID válido' })
  rolId: string;

  @IsUUID('4', { message: 'permisoId debe ser un UUID válido' })
  permisoId: string;
}
