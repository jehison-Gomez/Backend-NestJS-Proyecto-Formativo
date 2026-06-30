import { PartialType } from '@nestjs/mapped-types';
import { CreateRol_permisoDto } from './create-rol_permiso.dto';

export class UpdateRol_permisoDto extends PartialType(CreateRol_permisoDto) {}
