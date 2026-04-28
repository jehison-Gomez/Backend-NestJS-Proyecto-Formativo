import { Injectable, NotFoundException } from "@nestjs/common";
import { RolRepository } from "src/rol/domain/rol.repository";
import { Rol } from "src/rol/domain/rol.entity";
import { UpdateRolDto } from "../dto/update-rol.dto";
import { handleDBErrors } from "../handle-db-errors";

@Injectable()
export class UpdateRolUseCase {
    constructor(private readonly repository: RolRepository) {}

    async execute(id: string, dto: UpdateRolDto): Promise<Rol> {
        try {
            const exists = await this.repository.findOne(id);

            if (!exists)
                throw new NotFoundException(`Rol #${id} no encontrado`);

            return await this.repository.update(id, dto);
        } catch (error) {
            handleDBErrors(error);
        }
    }
}