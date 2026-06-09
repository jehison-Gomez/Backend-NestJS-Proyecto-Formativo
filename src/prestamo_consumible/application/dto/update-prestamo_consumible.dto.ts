import { PartialType } from '@nestjs/mapped-types';
import { CreatePrestamoConsumibleDto } from './create-prestamo_consumible.dto';

export class UpdatePrestamoConsumibleDto extends PartialType(CreatePrestamoConsumibleDto) {}
