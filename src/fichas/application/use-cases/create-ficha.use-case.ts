import { Injectable } from "@nestjs/common";
import { FichaRepository } from "src/fichas/domain/ficha.repository";
import { Ficha } from "src/fichas/domain/ficha.entity";
import { CreateFichaDto } from "../dto/create-ficha.dto";
import { handleDBErrors } from "../handle-db-errors";

@Injectable()
export class CreateFichaUseCase {
    constructor(private readonly repository: FichaRepository) {}

    async execute(dto: CreateFichaDto): Promise<Ficha> {
        try {
            const ficha = new Ficha({
                ...dto,
                fecha_inicio: new Date(dto.fecha_inicio),
                fecha_fin:    new Date(dto.fecha_fin),
            });
            return await this.repository.create(ficha);
        } catch (error) {
            handleDBErrors(error);
        }
    }
}