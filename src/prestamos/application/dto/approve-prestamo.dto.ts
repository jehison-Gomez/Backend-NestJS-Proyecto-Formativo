import { Type } from 'class-transformer';
import { IsArray, IsNumber, IsOptional, IsString, IsUUID, Min, ValidateNested } from 'class-validator';

export class CantidadAprobadaDto {
  @IsUUID('4')
  prestamoConsumibleId: string;

  @IsNumber()
  @Min(0)
  cantidadAprobada: number;
}

export class ApprovePrestamoDto {
  @IsOptional()
  @IsString()
  observacionRevision?: string;

  @IsOptional()
  @IsUUID('4')
  revisadoPorId?: string;

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CantidadAprobadaDto)
  cantidadesAprobadas?: CantidadAprobadaDto[];
}
