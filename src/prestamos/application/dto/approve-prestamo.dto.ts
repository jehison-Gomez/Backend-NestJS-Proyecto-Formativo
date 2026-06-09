import { IsOptional, IsString, IsUUID } from 'class-validator';

export class ApprovePrestamoDto {
  @IsOptional()
  @IsString()
  observacionRevision?: string;

  @IsOptional()
  @IsUUID('4')
  revisadoPorId?: string;
}
