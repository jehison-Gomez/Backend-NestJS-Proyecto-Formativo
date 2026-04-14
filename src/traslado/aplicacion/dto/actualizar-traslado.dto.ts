import { PartialType } from '@nestjs/mapped-types';
import { CrearTrasladoDto } from './crear-traslado.dto';
export class ActualizarTrasladoDto extends PartialType(CrearTrasladoDto) {}