import { Injectable } from "@nestjs/common";
import { UsuarioRepository } from "src/usuarios/domain/usuario.repository";
import { Usuario } from "src/usuarios/domain/usuario.entity";
import { handleDBErrors } from "../handle-db-errors";

@Injectable()
export class FindAllUsuariosUseCase {
    constructor(private readonly repository: UsuarioRepository) {}

    async execute(): Promise<Usuario[]> {
        try {
            return await this.repository.findAll();
        } catch (error) {
            handleDBErrors(error);
        }
    }
}