import { IsString, IsNotEmpty, IsOptional, IsEnum, MinLength, IsInt, Min } from 'class-validator';
import { RoleEstado } from '../../domain/role-estado.enum';

export class CreateRoleDto {
  @IsString({ message: 'El nombre debe ser texto' })
  @IsNotEmpty({ message: 'El nombre es obligatorio' })
  @MinLength(2, { message: 'El nombre debe tener al menos 2 caracteres' })
  nombre: string;

  @IsString({ message: 'La descripción debe ser texto' })
  @IsNotEmpty({ message: 'La descripción es obligatoria' })
  descripcion: string;

  @IsInt({ message: 'El nivel de acceso debe ser un número entero' })
  @Min(1, { message: 'El nivel de acceso debe ser mayor o igual a 1' })
  nivelAcceso: number;

  @IsOptional()
  @IsEnum(RoleEstado)
  estado?: RoleEstado;
}
