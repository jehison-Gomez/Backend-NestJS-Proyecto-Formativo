import { PartialType } from '@nestjs/mapped-types';
import { CreateTipo_ubicacionDto } from './create-tipo_ubicacion.dto';

export class UpdateTipo_ubicacionDto extends PartialType(CreateTipo_ubicacionDto) {}
