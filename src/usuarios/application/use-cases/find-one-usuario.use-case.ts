import { Injectable, NotFoundException } from "@nestjs/common";
import { UsuarioRepository } from "src/usuarios/domain/usuario.repository";
import { Usuario } from "src/usuarios/domain/usuario.entity";
import { handleDBErrors } from "../handle-db-errors";

@Injectable()
export class FindOneUsuarioUseCase {
    constructor(private readonly repository: UsuarioRepository) {}

    async execute(id: string): Promise<Usuario> {
        try {
            const usuario = await this.repository.findOne(id);

            if (!usuario)
                throw new NotFoundException(`Usuario #${id} no encontrado`);

            return usuario;
        } catch (error) {
            handleDBErrors(error);
        }
    }
}