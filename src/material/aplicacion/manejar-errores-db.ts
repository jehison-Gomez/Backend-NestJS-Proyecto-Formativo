import { BadRequestException, InternalServerErrorException } from '@nestjs/common';

export function manejarErroresDB(error: any): never {
  if (error.code === '23505')
    throw new BadRequestException(`Registro duplicado: ${error.detail}`);
  if (error.code === '23502')
    throw new BadRequestException(`Campo requerido faltante: ${error.column}`);
  console.error(error);
  throw new InternalServerErrorException('Error inesperado en el servidor');
}