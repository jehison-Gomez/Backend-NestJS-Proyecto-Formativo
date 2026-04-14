import { IsInt } from 'class-validator';
export class CrearMaterialUbicacionDto {
  @IsInt() materialId: number;
  @IsInt() ubicacionId: number;
}