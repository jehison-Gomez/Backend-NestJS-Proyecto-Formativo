import { Injectable, NotFoundException } from "@nestjs/common";
import { FichaRepository } from "src/fichas/domain/ficha.repository";
import { Ficha } from "src/fichas/domain/ficha.entity";
import { UpdateFichaDto } from "../dto/update-ficha.dto";
import { handleDBErrors } from "../handle-db-errors";

@Injectable()
export class UpdateFichaUseCase {
    constructor(private readonly repository: FichaRepository) {}

    async execute(id: string, dto: UpdateFichaDto): Promise<Ficha> {
        try {
            const exists = await this.repository.findOne(id);

            if (!exists)
                throw new NotFoundException(`Ficha #${id} no encontrado`);

            const { fecha_inicio, fecha_fin, ...rest } = dto;
            const partial: Partial<Ficha> = {
                ...rest,
                ...(fecha_inicio && { fecha_inicio: new Date(fecha_inicio) }),
                ...(fecha_fin    && { fecha_fin:    new Date(fecha_fin) }),
            };

            return await this.repository.update(id, partial);
        } catch (error) {
            handleDBErrors(error);
        }
    }
}