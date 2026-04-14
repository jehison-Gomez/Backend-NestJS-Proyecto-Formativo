import { PartialType } from '@nestjs/mapped-types';
import { CrearMaterialUbicacionDto } from './crear-material-ubicacion.dto';
export class ActualizarMaterialUbicacionDto extends PartialType(CrearMaterialUbicacionDto) {}