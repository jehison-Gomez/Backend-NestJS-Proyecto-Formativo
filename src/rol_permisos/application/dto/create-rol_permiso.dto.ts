import { IsNotEmpty, IsUUID } from "class-validator";

export class CreateRolPermisoDto {

    @IsUUID()
    @IsNotEmpty()
    id_rol: string;

    @IsUUID()
    @IsNotEmpty()
    id_permiso: string;
}
