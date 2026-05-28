import { IsEnum, IsNotEmpty, IsNumber, IsOptional, IsUUID, Min } from 'class-validator';
import { Prestamo_materialEstado } from '../../domain/prestamo_material-estado.enum';

export class CreatePrestamo_materialDto {
  @IsNumber()
  @Min(0)
  cantidad: number;

  @IsOptional()
  @IsEnum(Prestamo_materialEstado)
  estado?: Prestamo_materialEstado;

  @IsUUID('4', { message: 'El ID del préstamo debe ser un UUID válido' })
  @IsNotEmpty({ message: 'El préstamo es obligatorio' })
  prestamoId: string;

  @IsUUID('4', { message: 'El ID del material debe ser un UUID válido' })
  @IsNotEmpty({ message: 'El material es obligatorio' })
  materialId: string;

  @IsOptional()
  @IsUUID('4', { message: 'El ID de la devolución debe ser un UUID válido' })
  devolucionId?: string;
}
