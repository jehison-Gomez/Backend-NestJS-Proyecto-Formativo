import { PartialType } from '@nestjs/mapped-types';
import { CrearPrestamoDto } from './crear-prestamo.dto.js';
export class ActualizarPrestamoDto extends PartialType(CrearPrestamoDto) {}