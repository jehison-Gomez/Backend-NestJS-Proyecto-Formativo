import { PartialType } from '@nestjs/mapped-types';
import { CreateMaterial_consumibleDto } from './create-material_consumible.dto';

export class UpdateMaterial_consumibleDto extends PartialType(CreateMaterial_consumibleDto) {}
