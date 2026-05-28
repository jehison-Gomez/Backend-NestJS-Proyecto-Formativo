import { IsEnum, IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator';
import { AprobacioneDecision } from '../../domain/aprobacione-decision.enum';
import { AprobacioneEstado } from '../../domain/aprobacione-estado.enum';

export class CreateAprobacioneDto {
  @IsEnum(AprobacioneDecision)
  @IsNotEmpty()
  decision: AprobacioneDecision;

  @IsString()
  @IsOptional()
  observacion?: string;

  @IsOptional()
  @IsEnum(AprobacioneEstado)
  estado?: AprobacioneEstado;

  @IsUUID('4', { message: 'El ID del préstamo debe ser un UUID válido' })
  @IsNotEmpty({ message: 'El préstamo es obligatorio' })
  prestamoId: string;

  @IsUUID('4', { message: 'El ID del usuario debe ser un UUID válido' })
  @IsNotEmpty({ message: 'El usuario es obligatorio' })
  usuarioId: string;
}
