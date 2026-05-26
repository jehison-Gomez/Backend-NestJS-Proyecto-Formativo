import { PartialType } from '@nestjs/mapped-types';
import { CreateCategoria_materialDto } from './create-categoria_material.dto';

export class UpdateCategoria_materialDto extends PartialType(CreateCategoria_materialDto) {}
