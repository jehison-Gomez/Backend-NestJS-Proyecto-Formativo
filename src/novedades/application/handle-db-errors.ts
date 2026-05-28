import { BadRequestException, ConflictException, InternalServerErrorException, Logger } from '@nestjs/common';

const logger = new Logger('handleDbErrors');

export function handleDbErrors(error: any): never {
  logger.error(error);

  if (error.code === '23505')
    throw new ConflictException(
      `Ya existe un registro con ese valor único: ${error.detail}`
    );

  if (error.code === '23503')
    throw new ConflictException(
      `No se puede eliminar este registro porque tiene registros relacionados`
    );

  if (error.code === '23502')
    throw new BadRequestException(
      `Campo requerido faltante: ${error.column} no puede ser nulo`
    );

  if (error.code === '22P02')
    throw new BadRequestException(
      `Formato inválido: ${error.message}`
    );

  throw new InternalServerErrorException('Error desconocido, revise el log del servidor');
}
