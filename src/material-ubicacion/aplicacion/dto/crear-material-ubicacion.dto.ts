import { IsInt } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
export class CrearMaterialUbicacionDto {
    
  @ApiProperty() @IsInt() materialId: number;
  @ApiProperty() @IsInt() ubicacionId: number;
}