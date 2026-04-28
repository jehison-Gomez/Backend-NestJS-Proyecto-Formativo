import { Injectable, NotFoundException } from "@nestjs/common";
import { UsuarioRepository } from "src/usuarios/domain/usuario.repository";
import { Usuario } from "src/usuarios/domain/usuario.entity";
import { UpdateUsuarioDto } from "../dto/update-usuario.dto";
import { handleDBErrors } from "../handle-db-errors";

@Injectable()
export class UpdateUsuarioUseCase {
    constructor(private readonly repository: UsuarioRepository) {}

    async execute(id: string, dto: UpdateUsuarioDto): Promise<Usuario> {
        try {
            const exists = await this.repository.findOne(id);

            if (!exists)
                throw new NotFoundException(`Usuario #${id} no encontrado`);

            return await this.repository.update(id, dto);
        } catch (error) {
            handleDBErrors(error);
        }
    }
}