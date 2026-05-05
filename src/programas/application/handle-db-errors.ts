import { BadRequestException, ConflictException, InternalServerErrorException } from "@nestjs/common";

export function handleDBErrors(error: any): never {

    if (error.code === '23505')
        throw new ConflictException(
    `Ya existe un registro con ese valor único: ${error.detail}`
);

    if (error.code === '23503')
        throw new ConflictException(
    `No se puede eliminar este registro porque tiene registros relacionados que dependen de él`
);

    if (error.code === '23502')
        throw new BadRequestException(
    `Campo requerido faltante: ${error.column} no puede ser nulo`
);

    if (error.code === '22P02')
        throw new BadRequestException(
    `Formato inválido: ${error.message}`
);

    console.error(error);
    throw new InternalServerErrorException('Error desconocido, revise el log del servidor');
}