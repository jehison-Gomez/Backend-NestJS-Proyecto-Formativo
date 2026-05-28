import { PartialType } from '@nestjs/mapped-types';
import { CreatePrestamo_materialDto } from './create-prestamo_material.dto';

export class UpdatePrestamo_materialDto extends PartialType(CreatePrestamo_materialDto) {}
