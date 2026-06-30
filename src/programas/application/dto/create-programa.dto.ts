import { IsString, IsNotEmpty, IsOptional, IsEnum, MinLength, IsUUID } from 'class-validator';
import { ProgramaEstado } from '../../domain/programa-estado.enum';
import { ProgramaNivelFormacion } from '../../domain/programa-nivel-formacion.enum';

export class CreateProgramaDto {
  @IsString({ message: 'El nombre debe ser texto' })
  @IsNotEmpty({ message: 'El nombre es obligatorio' })
  @MinLength(5, { message: 'El nombre debe tener al menos 5 caracteres' })
  nombre: string;

  @IsString({ message: 'El código debe ser texto' })
  @IsNotEmpty({ message: 'El código es obligatorio' })
  @MinLength(5, { message: 'El código debe tener al menos 5 caracteres' })
  codigo: string;

  @IsEnum(ProgramaNivelFormacion, {
    message: `El nivel de formación debe ser: ${Object.values(ProgramaNivelFormacion).join(', ')}`,
  })
  @IsNotEmpty({ message: 'El nivel de formación es obligatorio' })
  nivelFormacion: ProgramaNivelFormacion;

  @IsOptional()
  @IsEnum(ProgramaEstado)
  estado?: ProgramaEstado;

  @IsUUID('4', { message: 'El ID del área debe ser un UUID válido' })
  @IsNotEmpty({ message: 'El área es obligatoria' })
  areaId: string;
}
