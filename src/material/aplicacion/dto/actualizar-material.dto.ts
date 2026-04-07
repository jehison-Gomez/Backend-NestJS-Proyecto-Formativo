import { PartialType } from '@nestjs/swagger';
import { CrearMaterialDto } from './crear-material.dto';

export class ActualizarMaterialDto extends PartialType(CrearMaterialDto) {}