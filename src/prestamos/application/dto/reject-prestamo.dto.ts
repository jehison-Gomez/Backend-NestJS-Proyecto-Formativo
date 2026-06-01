import { IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator';

export class RejectPrestamoDto {
  @IsNotEmpty()
  @IsString()
  motivo: string;

  @IsOptional()
  @IsUUID('4')
  rechazadoPorId?: string;
}
