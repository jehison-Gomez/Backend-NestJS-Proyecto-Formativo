import { IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator';

export class RejectPrestamoDto {
  @IsNotEmpty()
  @IsString()
  observacionRevision: string;

  @IsOptional()
  @IsUUID('4')
  revisadoPorId?: string;
}
