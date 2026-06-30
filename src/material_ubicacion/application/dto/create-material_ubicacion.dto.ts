import { IsNotEmpty, IsUUID } from 'class-validator';

export class CreateMaterial_ubicacionDto {
  @IsUUID('4', { message: 'El ID del material debe ser un UUID válido' })
  @IsNotEmpty({ message: 'El material es obligatorio' })
  materialId: string;

  @IsUUID('4', { message: 'El ID de la ubicación debe ser un UUID válido' })
  @IsNotEmpty({ message: 'La ubicación es obligatoria' })
  ubicacionId: string;
}
