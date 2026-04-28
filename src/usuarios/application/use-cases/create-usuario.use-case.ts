import { Injectable } from "@nestjs/common";
import { UsuarioRepository } from "src/usuarios/domain/usuario.repository";
import { Usuario } from "src/usuarios/domain/usuario.entity";
import { CreateUsuarioDto } from "../dto/create-usuario.dto";
import { handleDBErrors } from "../handle-db-errors";

@Injectable()
export class CreateUsuarioUseCase {
    constructor(private readonly repository: UsuarioRepository) {}

    async execute(dto: CreateUsuarioDto): Promise<Usuario> {
        try {
            const usuario = new Usuario({ ...dto });
            return await this.repository.create(usuario);
        } catch (error) {
            handleDBErrors(error);
        }
    }
}