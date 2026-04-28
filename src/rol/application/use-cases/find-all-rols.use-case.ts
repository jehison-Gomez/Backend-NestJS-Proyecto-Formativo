import { Injectable } from "@nestjs/common";
import { RolRepository } from "src/rol/domain/rol.repository";
import { Rol } from "src/rol/domain/rol.entity";
import { handleDBErrors } from "../handle-db-errors";

@Injectable()
export class FindAllRolsUseCase {
    constructor(private readonly repository: RolRepository) {}

    async execute(): Promise<Rol[]> {
        try {
            return await this.repository.findAll();
        } catch (error) {
            handleDBErrors(error);
        }
    }
}