import { Injectable, NotFoundException } from "@nestjs/common";
import { UsuarioRepository } from "src/usuarios/domain/usuario.repository";
import { handleDBErrors } from "../handle-db-errors";

@Injectable()
export class RemoveUsuarioUseCase {
    constructor(private readonly repository: UsuarioRepository) {}

    async execute(id: string): Promise<{ message: string }> {
        try {
            const exists = await this.repository.findOne(id);

            if (!exists)
                throw new NotFoundException(`Usuario #${id} no encontrado`);

            await this.repository.remove(id);

            return { message: `Usuario #${id} eliminado correctamente` };
        } catch (error) {
            handleDBErrors(error);
        }
    }
}