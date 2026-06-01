import { IsOptional, IsString, IsUUID } from 'class-validator';

export class ApprovePrestamoDto {
  @IsOptional()
  @IsString()
  observacion?: string;

  @IsOptional()
  @IsUUID('4')
  aprobadoPorId?: string;
}
