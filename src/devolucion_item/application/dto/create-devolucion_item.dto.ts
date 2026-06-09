import { IsBoolean, IsEnum, IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator';
import { DevolucionItemCondicion } from '../../domain/devolucion_item-condicion.enum';

export class CreateDevolucionItemDto {
  @IsUUID('4')
  @IsNotEmpty()
  devolucionId: string;

  @IsUUID('4')
  @IsNotEmpty()
  prestamoItemId: string;

  @IsEnum(DevolucionItemCondicion)
  condicionDevuelta: DevolucionItemCondicion;

  @IsOptional()
  @IsString()
  observacion?: string;

  @IsOptional()
  @IsBoolean()
  conNovedad?: boolean;
}
