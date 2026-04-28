import { Injectable } from "@nestjs/common";
import { FichaRepository } from "src/fichas/domain/ficha.repository";
import { Ficha } from "src/fichas/domain/ficha.entity";
import { handleDBErrors } from "../handle-db-errors";

@Injectable()
export class FindAllFichasUseCase {
    constructor(private readonly repository: FichaRepository) {}

    async execute(): Promise<Ficha[]> {
        try {
            return await this.repository.findAll();
        } catch (error) {
            handleDBErrors(error);
        }
    }
}