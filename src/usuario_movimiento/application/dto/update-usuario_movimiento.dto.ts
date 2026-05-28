import { PartialType } from '@nestjs/mapped-types';
import { CreateUsuario_movimientoDto } from './create-usuario_movimiento.dto';

export class UpdateUsuario_movimientoDto extends PartialType(CreateUsuario_movimientoDto) {}
