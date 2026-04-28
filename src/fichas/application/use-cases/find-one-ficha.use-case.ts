import { Injectable, NotFoundException } from "@nestjs/common";
import { FichaRepository } from "src/fichas/domain/ficha.repository";
import { Ficha } from "src/fichas/domain/ficha.entity";
import { handleDBErrors } from "../handle-db-errors";

@Injectable()
export class FindOneFichaUseCase {
    constructor(private readonly repository: FichaRepository) {}

    async execute(id: string): Promise<Ficha> {
        try {
            const ficha = await this.repository.findOne(id);

            if (!ficha)
                throw new NotFoundException(`Ficha #${id} no encontrado`);

            return ficha;
        } catch (error) {
            handleDBErrors(error);
        }
    }
}