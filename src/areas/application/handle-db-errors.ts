import {
  BadRequestException,
  InternalServerErrorException,
} from '@nestjs/common';

export function handleDBErrors(error: {
  code?: string;
  detail?: string;
  column?: string;
  message?: string;
}): never {
  if (error.code === '23505')
    throw new BadRequestException(`Registro duplicado: ${error.detail}`);

  if (error.code === '23502')
    throw new BadRequestException(
      `Campo requerido faltante: ${error.column} no puede ser nulo`,
    );

  if (error.code === '23P02')
    throw new BadRequestException(`Formato inválido: ${error.message}`);

  console.error(error);
  throw new InternalServerErrorException(
    'Error desconocido, revise el log del servidor',
  );
}
