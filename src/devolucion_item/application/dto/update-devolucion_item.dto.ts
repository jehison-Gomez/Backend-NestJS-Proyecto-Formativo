import { PartialType } from '@nestjs/mapped-types';
import { CreateDevolucionItemDto } from './create-devolucion_item.dto';

export class UpdateDevolucionItemDto extends PartialType(CreateDevolucionItemDto) {}
