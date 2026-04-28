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

            return await this.repository.update(id, dto);
        } catch (error) {
            handleDBErrors(error);
        }
    }
}