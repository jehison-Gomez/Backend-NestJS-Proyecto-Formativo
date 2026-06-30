import { IsNumber, IsOptional, IsString, Min } from 'class-validator';

export class IngresarStockDto {
  @IsNumber()
  @Min(1, { message: 'La cantidad a ingresar debe ser mayor a 0' })
  cantidad: number;

  @IsOptional()
  @IsString()
  descripcion?: string;
}
