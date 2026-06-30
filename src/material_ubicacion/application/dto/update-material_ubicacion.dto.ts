import { PartialType } from '@nestjs/mapped-types';
import { CreateMaterial_ubicacionDto } from './create-material_ubicacion.dto';

export class UpdateMaterial_ubicacionDto extends PartialType(CreateMaterial_ubicacionDto) {}
