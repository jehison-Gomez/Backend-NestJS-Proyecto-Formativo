import {
  BadRequestException,
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';

export function handleDBErrors(error: unknown): never {
  const err = error as { code?: string; detail?: string };
  if (err.code === '23505') {
    throw new ConflictException('Ya existe un registro con ese valor único');
  }
  if (err.code === '23503') {
    throw new ConflictException(
      'No se puede eliminar porque hay registros relacionados',
    );
  }
  if (err.code === '23502') {
    throw new BadRequestException(`Campos requeridos: ${err.detail}`);
  }
  if (err.code === '22P02') {
    throw new BadRequestException('Formato de dato inválido');
  }
  console.error('Database error:', error);
  throw new InternalServerErrorException('Error en la base de datos');
}
