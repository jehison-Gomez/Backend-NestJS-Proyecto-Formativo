import { BadRequestException, InternalServerErrorException } from '@nestjs/common';
export function manejarErroresDB(error: any): never {
  if (error.code === '23505') throw new BadRequestException(`Duplicado: ${error.detail}`);
  if (error.code === '23503') throw new BadRequestException('Referencia inválida');
  console.error(error);
  throw new InternalServerErrorException('Error inesperado en el servidor');
}