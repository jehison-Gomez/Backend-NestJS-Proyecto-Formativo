import { IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator';

export class CambiarUbicacionMaterialDto {
  @IsUUID('4', { message: 'El ID del material debe ser un UUID válido' })
  @IsNotEmpty({ message: 'El ID del material es obligatorio' })
  materialId: string;

  @IsUUID('4', { message: 'El ID de la nueva ubicación debe ser un UUID válido' })
  @IsNotEmpty({ message: 'La nueva ubicación es obligatoria' })
  nuevaUbicacionId: string;

  @IsString()
  @IsOptional()
  observacion?: string;
}
