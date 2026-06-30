import { IsString, IsNotEmpty, IsOptional, IsEnum, MinLength } from 'class-validator';
import { DepartamentoEstado } from '../../domain/departamento-estado.enum';

export class CreateDepartamentoDto {
  @IsString({ message: 'El nombre debe ser texto' })
  @IsNotEmpty({ message: 'El nombre es obligatorio' })
  @MinLength(5, { message: 'El nombre debe tener al menos 5 caracteres' })
  nombre: string;

  @IsString({ message: 'El codigo debe ser un texto' })
  @IsNotEmpty({ message: 'El codigo es obligatorio' })
  @MinLength(5, { message: 'El codigo debe tener minimo 5 caracteres'})
  codigo: string;

  @IsOptional()
  @IsEnum(DepartamentoEstado)
  estado?: DepartamentoEstado;
}
