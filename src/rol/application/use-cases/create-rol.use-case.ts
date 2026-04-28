import { Injectable } from "@nestjs/common";
import { RolRepository } from "src/rol/domain/rol.repository";
import { Rol } from "src/rol/domain/rol.entity";
import { CreateRolDto } from "../dto/create-rol.dto";
import { handleDBErrors } from "../handle-db-errors";

@Injectable()
export class CreateRolUseCase {
    constructor(private readonly repository: RolRepository) {}

    async execute(dto: CreateRolDto): Promise<Rol> {
        try {
            const rol = new Rol({ ...dto });
            return await this.repository.create(rol);
        } catch (error) {
            handleDBErrors(error);
        }
    }
}