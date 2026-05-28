import { PartialType } from '@nestjs/mapped-types';
import { CreateMaterial_itemDto } from './create-material_item.dto';

export class UpdateMaterial_itemDto extends PartialType(CreateMaterial_itemDto) {}
