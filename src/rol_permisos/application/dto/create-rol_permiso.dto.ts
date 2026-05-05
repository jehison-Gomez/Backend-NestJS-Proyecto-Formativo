import { IsNotEmpty, IsUUID } from "class-validator";

export class CreateRolPermisoDto {

    @IsUUID('4', { message: 'El id_rol debe ser un UUID válido' })
    @IsNotEmpty({ message: 'El id_rol es obligatorio' })
    id_rol: string;

    @IsUUID('4', { message: 'El id_permiso debe ser un UUID válido' })
    @IsNotEmpty({ message: 'El id_permiso es obligatorio' })
    id_permiso: string;
}
