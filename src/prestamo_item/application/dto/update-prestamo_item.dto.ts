import { PartialType } from '@nestjs/mapped-types';
import { CreatePrestamoItemDto } from './create-prestamo_item.dto';

export class UpdatePrestamoItemDto extends PartialType(CreatePrestamoItemDto) {}
