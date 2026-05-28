import { PartialType } from '@nestjs/mapped-types';
import { CreateAprobacioneDto } from './create-aprobacione.dto';

export class UpdateAprobacioneDto extends PartialType(CreateAprobacioneDto) {}
